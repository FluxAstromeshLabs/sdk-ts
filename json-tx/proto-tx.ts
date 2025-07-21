import { Any, MsgSend, TxBody, AuthInfo, SignDoc, TxRaw, BroadcastTxRequest, BroadcastMode, PubKey, SignMode } from './encoder'
import { sha256 } from "ethereum-cryptography/sha256.js";
import * as ethwallet from '@ethereumjs/wallet'
import * as secp256k1 from '../chain/cosmos/crypto/secp256k1/keys'
import * as ethutil from '@ethereumjs/util'
import keccak256 from 'keccak256';

function compressPublicKey(uncompressedPublicKey: Buffer): Buffer {
    const xCoord = uncompressedPublicKey.slice(0,32);
    const yCoord = uncompressedPublicKey.slice(32,64);
    const yParityByte = yCoord[31] % 2 == 0 ? Buffer.from([2]) : Buffer.from([3])
    return Buffer.concat([yParityByte, xCoord])
}

(async function() {
    let baseLcd = 'http://localhost:10337'
    let baseTm = 'http://localhost:26657'
    let sk = '88cbead91aee890d27bf06e003ade3d4e952427e88f88d31d61d3ef5e5d54305'
    let injAddress = 'inj1cml96vmptgw99syqrrz8az79xer2pcgp0a885r'
    
    const wallet = ethwallet.Wallet.fromPrivateKey(Uint8Array.from(Buffer.from(sk, 'hex')))
    const senderPrivKey: secp256k1.PrivKey = {key: wallet.getPrivateKey()}
    const senderPubkey: PubKey = {key: compressPublicKey(Buffer.from(wallet.getPublicKey()))}
    const senderPubkeyAny: Any = {
        type_url: '/' + PubKey.$type,
        value: PubKey.encode(senderPubkey).finish()
    }

    let accInfo = await (await fetch(`${baseLcd}/cosmos/auth/v1beta1/accounts/${injAddress}`)).json()
    let { account_number, sequence } = accInfo.account.base_account
    console.log('res:', accInfo, account_number, sequence)

    const msg: MsgSend = {
        from_address: 'inj1cml96vmptgw99syqrrz8az79xer2pcgp0a885r',
        to_address: 'inj1jcltmuhplrdcwp7stlr4hlhlhgd4htqhe4c0cs',
        amount: [{ denom: 'inj', amount: '1' }],
    }
    const msgAny: Any = {
        type_url: `/${MsgSend.$type}`,
        value: MsgSend.encode(msg).finish(),
    }
    // prep tx data
    const txBody: TxBody = {
        messages: [msgAny],
        memo: '',
        timeout_height: "30000",
        extension_options: [],
        non_critical_extension_options: []
    }

    const authInfo: AuthInfo = {
        signer_infos: [{
            public_key: senderPubkeyAny,
            mode_info: {
            single: {
                mode: SignMode.SIGN_MODE_DIRECT,
            },
            },
            sequence: sequence,
        },
        ],
        fee: {
        amount: [
            {denom: "inj", amount: "100000000000000"}
        ],
        gas_limit: "200000",
        payer: "",
        granter: ""
        },
    }

    const signDoc: SignDoc = {
        body_bytes: TxBody.encode(txBody).finish(),
        auth_info_bytes: AuthInfo.encode(authInfo).finish(),
        chain_id: 'injective-888',
        account_number: account_number,
    }
    const signBytes = SignDoc.encode(signDoc).finish()

    // build tx
    const msgHash = Buffer.from(keccak256(Buffer.from(signBytes)))
    const sigParts = ethutil.ecsign(msgHash, Buffer.from(senderPrivKey.key))
    const sig = Uint8Array.from(Buffer.concat([sigParts.r, sigParts.s]))

    // broadcast tx
    const txRaw: TxRaw = {
        body_bytes: TxBody.encode(txBody).finish(),
        auth_info_bytes: AuthInfo.encode(authInfo).finish(),
        signatures: [sig],
    }
    const txBytes = TxRaw.encode(txRaw).finish()

    let broadcastUrl = `${baseTm}/broadcast_tx_sync?tx=0x${Buffer.from(txBytes).toString('hex')}`
    console.log('url:', broadcastUrl)
    let broadcastRes = await (await fetch(broadcastUrl)).json()
    console.log('broadcast res:', broadcastRes)
})()
