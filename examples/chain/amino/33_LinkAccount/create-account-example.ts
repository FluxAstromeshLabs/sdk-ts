import * as ethwallet from '@ethereumjs/wallet';
import * as ethutil from '@ethereumjs/util';
import { bech32 } from 'bech32';
import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport';
import * as svmtx from '../../../../chain/flux/svm/v1beta1/tx';
import * as svmservice from '../../../../chain/flux/svm/v1beta1/query';
import * as txtypes from '../../../../chain/cosmos/tx/v1beta1/tx';
import * as txservice from '../../../../chain/cosmos/tx/v1beta1/service';
import * as authservice from '../../../../chain/cosmos/auth/v1beta1/query';
import * as ethsecp256k1 from '../../../../chain/cosmos/crypto/ethsecp256k1/keys';
import { Coin } from '../../../../chain/cosmos/base/v1beta1/coin';
import { Ed25519, Ed25519Keypair, keccak256 } from '@cosmjs/crypto';
import * as ethcrypto from 'eth-crypto'
import { BigNumber } from 'bignumber.js';
import * as banktypes from '../../../../chain/cosmos/bank/v1beta1/tx';
import * as web3 from '@solana/web3.js';
import * as anytypes from '../../../../chain/google/protobuf/any'
import * as signingtypes from '../../../../chain/cosmos/tx/signing/v1beta1/signing'
import { toFluxSvmTransaction } from '../../../../packages';

const defaultLamportsPerByteYear = 1000000000 * 365 / 100 / (1024 * 1024)
const defaultExemptionThreshold = 2.0
const upgradableLoaderPubkey = new web3.PublicKey("BPFLoaderUpgradeab1e11111111111111111111111")

function getWalletAddr(wallet: ethwallet.Wallet): string {
  return bech32.encode('lux', bech32.toWords(wallet.getAddress()));
}

async function getSvmAccountLink(svmClient: svmservice.Query, cosmosAddr: string): Promise<svmservice.AccountLinkResponse | undefined> {
  try {
    return await svmClient.AccountLink({ address: cosmosAddr });
  } catch (e: any) {
    if (e.toString().includes("account link not found")) {
      return undefined;
    }
    throw e;
  }
}

async function linkSvmAccount(
  txClient: txservice.Service,
  authClient: authservice.Query,
  svmClient: svmservice.Query, 
  wallet: ethwallet.Wallet,
  svmKeypair: web3.Keypair, 
  luxAmount: BigNumber
): Promise<web3.PublicKey> {
  const cosmosAddress = getWalletAddr(wallet);
  let accountLink: svmservice.AccountLinkResponse;

  try {
    accountLink = await getSvmAccountLink(svmClient, cosmosAddress);
  } catch (e: any) {
    if (!e.toString().includes("account link not found")) {
      throw e;
    }
  }

  const senderInfo = await authClient.AccountInfo({ address: getWalletAddr(wallet) });

  if (!accountLink) {
    const keypair = new Ed25519Keypair(Buffer.from(svmKeypair.secretKey.buffer.slice(0, 32)), svmKeypair.publicKey.toBuffer());
    const linkSig = await Ed25519.createSignature(wallet.getAddress(), keypair);

    const msg = svmtx.MsgLinkSVMAccount.create({
      sender: getWalletAddr(wallet),
      svm_pubkey: svmKeypair.publicKey.toBuffer(),
      svm_signature: linkSig,
      amount: Coin.create({
        denom: 'lux',
        amount: luxAmount.toString(),
      }),
    });

    await broadcastMsgsSync(
      txClient,
      [parseInt(senderInfo.info.account_number)],
      [parseInt(senderInfo.info.sequence)],
      [svmtx.MsgLinkSVMAccount],
      [msg],
      [wallet]
    );
    return new web3.PublicKey(keypair.pubkey);
  }

  return new web3.PublicKey(accountLink.link.svm_addr);
}

async function createCosmosAccounts(
  txClient: txservice.Service,
  authClient: authservice.Query,
  ownerWallet: ethwallet.Wallet,
  newWallets: ethwallet.Wallet[]
): Promise<any> {
  const ownerAddr = getWalletAddr(ownerWallet);
  const ownerInfo = await authClient.AccountInfo({ address: ownerAddr });
  const ownerAccNum = parseInt(ownerInfo.info.account_number);
  const ownerAccSeq = parseInt(ownerInfo.info.sequence);

  const luxAmount = new BigNumber(100000000000000000)
  const inputs = [
    {
      address: ownerAddr,
      coins: [
        {
          denom: 'lux',
          amount: luxAmount.multipliedBy(newWallets.length).toString(),
        },
      ],
    },
  ];

  const outputs = newWallets.map(wallet => ({
    address: getWalletAddr(wallet),
    coins: [
      {
        denom: 'lux',
        amount: luxAmount.toString(),
      },
    ],
  }));

  const sendMsg = banktypes.MsgMultiSend.create({
    inputs,
    outputs,
  });

  const sendMsgResp = await broadcastMsgsSync(txClient, [ownerAccNum], [ownerAccSeq], [banktypes.MsgMultiSend], [sendMsg], [ownerWallet]);

  console.log('Send Lux to create accounts:', sendMsgResp);
  return sendMsgResp;
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
    const msgAny = {
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
    non_critical_extension_options: [],
  };

  let signerInfos = [];
  for (let i = 0; i < wallets.length; i++) {
    const senderXPubkey = ethcrypto.publicKey.compress(Buffer.from(wallets[i].getPublicKey()).toString('hex'));
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
  authInfo.fee.amount[0].amount = (new BigNumber(estGas)).multipliedBy(new BigNumber(500000000)).toString();

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

function getRentExemptLamportAmount(dataLen: number): number {
  return Math.round(defaultLamportsPerByteYear * (dataLen + 128) * defaultExemptionThreshold)
}

(async () => {
  const cc = new txservice.GrpcWebImpl('http://localhost:10337', {
    transport: NodeHttpTransport(),
  });
  const txClient = new txservice.ServiceClientImpl(cc);
  const authClient = new authservice.QueryClientImpl(cc);
  const svmClient = new svmservice.QueryClientImpl(cc);
  const ownerCosmosWallet = ethwallet.Wallet.fromPrivateKey(Uint8Array.from(Buffer.from('88CBEAD91AEE890D27BF06E003ADE3D4E952427E88F88D31D61D3EF5E5D54305', 'hex')));
  const programCosmosWallet = ethwallet.Wallet.generate();

  await createCosmosAccounts(txClient, authClient, ownerCosmosWallet, [programCosmosWallet]);

  console.log('=== Linking uploader SVM program to Cosmos address ===');
  const ownerSvmKeypair = web3.Keypair.generate();
  const ownerPubkey = await linkSvmAccount(txClient, authClient, svmClient, ownerCosmosWallet, ownerSvmKeypair, new BigNumber(1000000000000));

  console.log('=== Linking program keypair to Cosmos address ===');
  const programSvmKeypair = web3.Keypair.generate();
  const programPubkey = await linkSvmAccount(txClient, authClient, svmClient, programCosmosWallet, programSvmKeypair, new BigNumber(0));

  console.log('=== Create program account ===');
  let createProgramIx = web3.SystemProgram.createAccount({
    fromPubkey: ownerPubkey,
    newAccountPubkey: programPubkey,
    lamports: getRentExemptLamportAmount(36),
    space: 36,
    programId: upgradableLoaderPubkey,
  })
  let initAccountsTx = new web3.Transaction().add(createProgramIx)
  initAccountsTx.feePayer = ownerPubkey

  const createAccountsTx = toFluxSvmTransaction(
    [
      getWalletAddr(ownerCosmosWallet), 
      getWalletAddr(programCosmosWallet),
    ], 
    initAccountsTx, 1000000,
  )

  let ownerAddr = await getWalletAddr(ownerCosmosWallet)
  let programCosmosAddr = await getWalletAddr(programCosmosWallet)
  let ownerAccInfo = await authClient.AccountInfo({address: ownerAddr})
  let programAccInfo = await authClient.AccountInfo({address: programCosmosAddr})

  let createAccountsTxsResult = await broadcastMsgsSync(
    txClient, 
    [
      parseInt(ownerAccInfo.info.account_number),
      parseInt(programAccInfo.info.account_number),
    ], 
    [
      parseInt(ownerAccInfo.info.sequence),
      parseInt(programAccInfo.info.sequence),
    ], 
    [svmtx.MsgTransaction],
    [createAccountsTx],
    [ownerCosmosWallet, programCosmosWallet],
  )

  console.log('program account created:', programPubkey.toBase58())
  console.log(`tx: ${createAccountsTxsResult.tx_response.txhash} (height: ${createAccountsTxsResult.tx_response.height}). Gas used / want: ${createAccountsTxsResult.tx_response.gas_used}/${createAccountsTxsResult.tx_response.gas_wanted}`)
})();
