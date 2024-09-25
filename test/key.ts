import * as web3 from '@solana/web3.js'

let key = new Uint8Array(Buffer.from([18,16,87,129,177,76,216,170,225,156,219,211,31,65,3,230,163,54,230,62,135,68,141,186,227,5,196,250,122,174,155,198,120,204,104,240,137,124,64,171,83,24,101,133,23,197,78,210,49,86,5,27,40,88,194,192,0,250,197,67,209,49,5,235]))
let pair = web3.Keypair.fromSecretKey(key)
console.log('pubkey:', pair.publicKey.toBase58())