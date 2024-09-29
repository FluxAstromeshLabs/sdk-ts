import * as ethwallet from '@ethereumjs/wallet'
import * as ethutil from '@ethereumjs/util'
import { bech32 } from 'bech32'
import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport'
import * as web3 from '@solana/web3.js'
import * as anytypes from '../../../../chain/google/protobuf/any'
import * as svmtx from '../../../../chain/flux/svm/v1beta1/tx'
import * as svmservice from '../../../../chain/flux/svm/v1beta1/query'
import * as txtypes from '../../../../chain/cosmos/tx/v1beta1/tx'
import * as txservice from '../../../../chain/cosmos/tx/v1beta1/service'
import * as authservice from '../../../../chain/cosmos/auth/v1beta1/query'
import * as ethsecp256k1 from '../../../../chain/cosmos/crypto/ethsecp256k1/keys'
import * as signingtypes from '../../../../chain/cosmos/tx/signing/v1beta1/signing'
import * as ethcrypto from 'eth-crypto'
import { Coin } from '../../../../chain/cosmos/base/v1beta1/coin'
import { Ed25519, Ed25519Keypair, keccak256 } from '@cosmjs/crypto'
import { BigNumber } from 'bignumber.js'

const defaultGasPrice = 500000000

// Helper function to get the Bech32 address
function getWalletAddr(wallet: ethwallet.Wallet): string {
  return bech32.encode('lux', bech32.toWords(wallet.getAddress()))
}

async function getSvmAccountLink(svmClient: svmservice.Query, cosmosAddr: string): Promise<svmservice.AccountLinkResponse | undefined> {
  try {
    return await svmClient.AccountLink({ address: cosmosAddr });
  } catch (e: any) {
    if (e.toString().includes("account link not found")) {
      return undefined; // Return undefined if no account link found
    }
    throw e; 
  }
}

async function checkTxWithRetry(
  txClient: txservice.Service,
  txHash: string,
  timeout = 30000,
  retryInterval = 1000
): Promise<any> {
  const startTime = Date.now();
  const retry = async (): Promise<any> => {
    if (Date.now() - startTime >= timeout) {
      throw new Error("Timeout exceeded, transaction not included in a block");
    }
    try {
      const result = await txClient.GetTx({ hash: txHash });
      if (result) {
        return result;
      }
    } catch (error) {
      if (!error.toString().includes("tx not found")) {
        throw error;
      }
    }
    return new Promise((resolve) => setTimeout(resolve, retryInterval)).then(retry);
  };
  return retry();
}

async function broadcastMsgsSync(
  txClient: txservice.Service,
  senderAccNums: number[],
  senderAccSeqs: number[],
  msgTypes: any[],
  msgs: any[], 
  wallets: ethwallet.Wallet[]
) {
  let msgAnys = [];
  for (let i = 0; i < msgs.length; i++) {
    const msgAny: anytypes.Any = {
      type_url: `/${msgTypes[i].$type}`,
      value: msgTypes[i].encode(msgs[i]).finish(),
    };
    msgAnys.push(msgAny);
  }

  const txBody: txtypes.TxBody = {
    messages: msgAnys,
    memo: '',
    timeout_height: '16041999',
    extension_options: [],
    non_critical_extension_options: []
  };

  let signerInfos = [];
  for (let i = 0; i < wallets.length; i++) {
    const senderXPubkey = ethcrypto.publicKey.compress(
      Buffer.from(wallets[i].getPublicKey()).toString('hex')
    );
    const senderPubkey: ethsecp256k1.PubKey = { key: Buffer.from(senderXPubkey, 'hex') };
    const senderPubkeyAny: anytypes.Any = {
      type_url: '/' + ethsecp256k1.PubKey.$type,
      value: ethsecp256k1.PubKey.encode(senderPubkey).finish(),
    };

    signerInfos.push(txtypes.SignerInfo.create({
      public_key: senderPubkeyAny,
      mode_info: {
        single: {
          mode: signingtypes.SignMode.SIGN_MODE_DIRECT,
        },
      },
      sequence: senderAccSeqs[i].toString(),
    }));
  }

  const authInfo: txtypes.AuthInfo = {
    signer_infos: signerInfos,
    fee: {
      amount: [{ denom: 'lux', amount: '2000000000000000' }],
      gas_limit: '0',
      payer: '',
      granter: '',
    },
    tip: undefined,
  };

  let simulateSigs = [];
  for (let i = 0; i < wallets.length; i++) {
    simulateSigs.push(new Uint8Array());
  }

  let txRaw: txtypes.TxRaw = {
    body_bytes: txtypes.TxBody.encode(txBody).finish(),
    auth_info_bytes: txtypes.AuthInfo.encode(authInfo).finish(),
    signatures: simulateSigs,
  };

  const simulateReq: txservice.SimulateRequest = {
    tx: undefined,
    tx_bytes: txtypes.TxRaw.encode(txRaw).finish(),
  };

  let simResp = await txClient.Simulate(simulateReq);
  let estGas = Math.round(parseInt(simResp.gas_info.gas_used) * 1.5);

  authInfo.fee.gas_limit = estGas.toString();
  authInfo.fee.amount[0].amount = (new BigNumber(estGas)).multipliedBy(new BigNumber(defaultGasPrice)).toString();

  let sigs = [];
  for (let i = 0; i < wallets.length; i++) {
    let signDoc: txtypes.SignDoc = {
      body_bytes: txtypes.TxBody.encode(txBody).finish(),
      auth_info_bytes: txtypes.AuthInfo.encode(authInfo).finish(),
      chain_id: 'flux-1',
      account_number: senderAccNums[i].toString(),
    };

    const signBytes = txtypes.SignDoc.encode(signDoc).finish();
    const msgHash = Buffer.from(keccak256(signBytes));
    const senderSign = ethutil.ecsign(msgHash, Buffer.from(wallets[i].getPrivateKey()));
    const senderCosmosSig = Uint8Array.from(Buffer.concat([senderSign.r, senderSign.s]));
    sigs.push(senderCosmosSig);
  }

  txRaw = {
    body_bytes: txtypes.TxBody.encode(txBody).finish(),
    auth_info_bytes: txtypes.AuthInfo.encode(authInfo).finish(),
    signatures: sigs,
  };

  const broadcastReq: txservice.BroadcastTxRequest = {
    tx_bytes: txtypes.TxRaw.encode(txRaw).finish(),
    mode: txservice.BroadcastMode.BROADCAST_MODE_SYNC,
  };

  let resp = await txClient.BroadcastTx(broadcastReq);
  if (resp.tx_response.code != 0) {
    throw `tx error, code: ${resp.tx_response.code}, log: ${resp.tx_response.raw_log}`;
  }

  let txHash = resp.tx_response.txhash;
  return await checkTxWithRetry(txClient, txHash);
}

(async () => {
  const cc = new txservice.GrpcWebImpl('http://localhost:10337', {
    transport: NodeHttpTransport(),
  });
  const txClient = new txservice.ServiceClientImpl(cc);
  const authClient = new authservice.QueryClientImpl(cc);
  const svmClient = new svmservice.QueryClientImpl(cc);

  const wallet = ethwallet.Wallet.fromPrivateKey(Uint8Array.from(Buffer.from('88CBEAD91AEE890D27BF06E003ADE3D4E952427E88F88D31D61D3EF5E5D54305', 'hex')));
  const senderAddr = getWalletAddr(wallet);
  const ownerSvmKeypair = web3.Keypair.generate();

  // Fetch sender account info
  const senderInfo = await authClient.AccountInfo({ address: senderAddr });
  let senderAccNum = parseInt(senderInfo.info!.account_number!);
  let senderAccSeq = parseInt(senderInfo.info!.sequence!);

  // Check if the SVM account is already linked
  let accountLink = await getSvmAccountLink(svmClient, senderAddr);
  
  if (!accountLink) {
    // Sign and link account
    let keypair = new Ed25519Keypair(Buffer.from(ownerSvmKeypair.secretKey.buffer.slice(0, 32)), ownerSvmKeypair.publicKey.toBuffer());
    let linkSig = await Ed25519.createSignature(wallet.getAddress(), keypair);

    let msg = svmtx.MsgLinkSVMAccount.create({
      sender: senderAddr,
      svm_pubkey: ownerSvmKeypair.publicKey.toBuffer(),
      svm_signature: linkSig,
      amount: Coin.create({
        denom: 'lux',
        amount: '1000000000000', // Example amount
      }),
    });

    await broadcastMsgsSync(
      txClient,
      [senderAccNum],
      [senderAccSeq],
      [svmtx.MsgLinkSVMAccount],
      [msg],
      [wallet]
    );

    console.log(`SVM account ${ownerSvmKeypair.publicKey.toBase58()} linked to ${getWalletAddr(wallet)}`);
  } else {
    console.log(`SVM account ${new web3.PublicKey(accountLink.link.svm_addr).toBase58()} linked to ${getWalletAddr(wallet)}`);
  }
})();
