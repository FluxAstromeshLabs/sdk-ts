import * as txtypes from "../chain/cosmos/tx/v1beta1/tx";

interface Eip712Types {
  [key: string]: any
}

const isPrimitive : { [key: string]: boolean} = {
  "string": true,
  "number": true,
  "boolean": true,
};

export const getEIP712SignBytes = (signDoc: txtypes.SignDoc, msgsJSON: any[], feePayerAddr: string | undefined): any => {
  const txBody = txtypes.TxBody.decode(signDoc.body_bytes)
  const authInfo = txtypes.AuthInfo.decode(signDoc.auth_info_bytes)

  // set domain
  const domain = {
    name:              'Flux Web3',
    version:           '1.0.0',
    chainId:           '0x1',
    verifyingContract: 'cosmos',
    salt:              '0',
  }

  // set tx
  let tx = {
    account_number: signDoc.account_number,
    chain_id: signDoc.chain_id,
    fee: {
      feePayer: feePayerAddr,
      amount: authInfo.fee!.amount,
      gas: authInfo.fee!.gas_limit,
    },
    memo: txBody.memo,
    msgs: msgsJSON,
    sequence: authInfo.signer_infos[0].sequence,
    timeout_height: txBody.timeout_height,
  }

  const txTypes = extractEIP712Types(tx)
  tx = deepSortObject(tx)

  return {
    types:       txTypes,
    primaryType: 'Tx',
    domain:      domain,
    message:     tx,
  }
}

function deepSortObject (obj: any): any {
  if (typeof obj !== 'object' || obj === null) {
    return obj; // Base case: return non-object values as-is
  }

  if (Array.isArray(obj)) {
    // If it's an array, sort each element recursively
    return obj.map(deepSortObject);
  }

  // For objects, sort the keys and create a new object with sorted keys and sorted values
  const sortedObj: any = {};
  Object.keys(obj).sort().forEach((key) => {
    sortedObj[key] = deepSortObject(obj[key]);
  });

  return sortedObj;
}

function getPrimitiveEthType(some: any): string {
  let type = typeof some
  if (type == 'number') {
    return 'int32'
  }

  if (type == 'boolean') {
    return 'bool'
  }

  return type
}

function walkNestedJSON(rootTypes: Eip712Types, jsonObj: any, parentKey: string = ''): void {
  // iterate json object
  for (const key in jsonObj) {
    const value = jsonObj[key]
    // handle array field
    if (Array.isArray(value)) {
      // exclude primitive types
      if (isPrimitive[typeof value[0]]) {
        rootTypes[parentKey].push({
          name: key,
          type: getPrimitiveEthType(value[0]) + '[]',
        })
        continue
      }

      const childKey = 'Type' + key.charAt(0).toUpperCase() + key.slice(1)
      rootTypes[childKey] = []
      rootTypes[parentKey].push({
        name: key,
        type: childKey + '[]',
      })
      walkNestedJSON(rootTypes, value[0], childKey)
      continue
    }

    // handle object field
    if (!Array.isArray(value) && typeof value === 'object') {
      const childKey = 'Type' + key.charAt(0).toUpperCase() + key.slice(1)
      rootTypes[childKey] = []
      rootTypes[parentKey].push({
        name: key,
        type: childKey,
      })
      walkNestedJSON(rootTypes, value, childKey)
      continue
    }

    // handle primary field
    rootTypes[parentKey].push({
      name: key,
      type: getPrimitiveEthType(value),
    })
  }
}

function extractEIP712Types(tx: any): any {
  let feeTypes = [
    {name: 'feePayer', type: 'string'},
    {name: 'amount', type: 'Coin[]'},
    {name: 'gas', type: 'string'},
  ]
  if (tx.fee.feePayer == null || tx.fee.feePayer == "") {
    feeTypes = feeTypes.splice(1)
  }

  let rootTypes: Eip712Types = {
    'EIP712Domain': [
      {
        name: 'name',
        type: 'string',
      },
      {
        name: 'version',
        type: 'string',
      },
      {
        name: 'chainId',
        type: 'uint256',
      },
      {
        name: 'verifyingContract',
        type: 'string',
      },
      {
        name: 'salt',
        type: 'string',
      },
    ],
    'Tx': [
      {name: 'account_number', type: 'string'},
      {name: 'chain_id', type: 'string'},
      {name: 'fee', type: 'Fee'},
      {name: 'memo', type: 'string'},
      {name: 'msgs', type: 'Msg[]'},
      {name: 'sequence', type: 'string'},
      {name: 'timeout_height', type: 'string'},
    ],
    'Fee': feeTypes,
    'Coin': [
      {name: 'denom', type: 'string'},
      {name: 'amount', type: 'string'},
    ],
    'Msg': [
      {name: 'type', type: 'string'},
      {name: 'value', type: 'MsgValue'},
    ],
    MsgsPlaceHolder: [],
  }

  walkNestedJSON(rootTypes, tx['msgs'], 'MsgsPlaceHolder')

  // cleanup
  delete rootTypes['MsgsPlaceHolder']

  // TODO: delete this part to start debug & support multiple different types of msgs
  for (let i=0; i<tx['msgs'].length; i++) {
    delete rootTypes[`Type${i}`]
  }
  rootTypes['MsgValue'] = rootTypes['TypeValue']
  delete rootTypes['TypeValue']

  return deepSortObject(rootTypes)
}