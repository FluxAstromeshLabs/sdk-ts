import * as ethwallet from '@ethereumjs/wallet'
import * as axios from 'axios'
import { getMessage } from 'eip-712';
import * as ethutil from '@ethereumjs/util'

function compressPublicKey(uncompressedPublicKey: Buffer): Buffer {
    const xCoord = uncompressedPublicKey.slice(0,32);
    const yCoord = uncompressedPublicKey.slice(32,64);
    const yParityByte = yCoord[31] % 2 == 0 ? Buffer.from([2]) : Buffer.from([3])
    return Buffer.concat([yParityByte, xCoord])
}

;(async() => {
    let baseLcd = 'https://sentry.lcd.injective.network'
    let baseWeb3gw = 'https://products.web3-gateway.injective.network'

    let sk = 'c950a3ad7b6e0f57bda71e328ff55ef6c83aaa11be4a7c4ab6d3acec6171e1dd'
    let injAddress = 'inj1wqxvea45jptaf9688k4senka0c53e8kk9c4deh'
    let senderPrivKey = Uint8Array.from(Buffer.from(sk, 'hex'))
    const wallet = ethwallet.Wallet.fromPrivateKey(senderPrivKey)
    let compressedPubkey = compressPublicKey(Buffer.from(wallet.getPublicKey()))

    let accInfo = await (await fetch(`${baseLcd}/cosmos/auth/v1beta1/accounts/${injAddress}`)).json()
    let { account_number, sequence } = accInfo.account.base_account

    let subaccountId = '0x700CcCF6b49057D497473dAB0cCedd7e291c9ed6000000000000000000000000'
    let createOrderMsg = {
        '@type': '/injective.exchange.v1beta1.MsgBatchUpdateOrders',
        sender: injAddress,
        subaccount_id: subaccountId,
        spot_market_ids_to_cancel_all: ['0xa508cb32923323679f29a032c70342c147c17d0145625922b0ef22e955c844c0'],
        spot_orders_to_create: [
            {
                market_id: '0xa508cb32923323679f29a032c70342c147c17d0145625922b0ef22e955c844c0',
                order_info: {
                    subaccount_id: subaccountId,
                    fee_recipient: injAddress,
                    price: '0.000000000020000000',
                    quantity: '200000000000000000',
                    cid: '',
                },
                order_type: 'SELL',
                trigger_price: null,
            }
        ]
    }

    let timeoutHeight = 1000000000;
    let prepTx = {
        "chainID": 1,
        "eip712Wrapper": "v2",
        "fee": {
          "delegateFee": false,
          "gas": 0,
          "price": [
            {
              "amount": "160000000",
              "denom": "inj"
            },
          ]
        },
        "memo": "",
        "msgs": [Buffer.from(JSON.stringify(createOrderMsg)).toString('base64')],
        "sequence": parseInt(sequence),
        "signerAddress": '0x700CcCF6b49057D497473dAB0cCedd7e291c9ed6',
        "timeoutHeight": 1000000000,
    }

    let client = new axios.Axios({
        baseURL: baseWeb3gw,
    })

    // prepare tx to estimate gas
    let prepareTxRes = await client.post(`${baseWeb3gw}/api/exchange/gateway/v1/prepareTx`, JSON.stringify(prepTx))
    let resp = JSON.parse(prepareTxRes.data)

    let typedData = JSON.parse(resp.data)
    let msgHash = Buffer.from(getMessage(typedData, true, { verifyDomain: false }))
    const senderSig = ethutil.ecsign(msgHash, Buffer.from(senderPrivKey))
    const senderCosmosSig = Uint8Array.from(Buffer.concat([senderSig.r, senderSig.s, Buffer.from([0])]))
    const senderCosmosSigHex = '0x' + Buffer.from(senderCosmosSig).toString('hex')
    const { feePayer, feePayerSig } = resp
    console.log('cosmos sig:', senderCosmosSigHex)
    console.log('fee payer:', feePayer)
    console.log('fee payer sig:', feePayerSig)
    const txInfo = {
        'context': typedData.message.context,
        'msgs': null
    }

    let broadcastTx = {
        "chainID": 1,
        "feePayer": feePayer,
        "feePayerSig": feePayerSig,
        "mode": "sync",
        "msgs": [Buffer.from(JSON.stringify(createOrderMsg)).toString('base64')],
        "pubKey": {
          "key": '0x' + compressedPubkey.toString('hex'),
          "type": "/injective.crypto.v1beta1.ethsecp256k1.PubKey"
        },
        "signature": '0x' + Buffer.from(senderCosmosSig).toString('hex'),
        "tx": Buffer.from(JSON.stringify(txInfo)).toString('base64')
    }

    let broadcastTxRes = await client.post(`${baseWeb3gw}/api/exchange/gateway/v1/broadcastTx`, JSON.stringify(broadcastTx))
    console.log('broadcast tx res:', broadcastTxRes.data)
})()
