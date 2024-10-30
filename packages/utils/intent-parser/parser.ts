import {
  FISQueryInstruction,
  FISQueryRequest,
  queryActionFromJSON
} from '../../../chain/flux/astromesh/v1beta1/query'
import { Plane, planeFromJSON } from '../../../chain/flux/astromesh/v1beta1/tx'
import { MsgTriggerStrategies } from '../../../chain/flux/strategy/v1beta1/tx'
import * as Handlebars from 'handlebars'
import * as web3 from '@solana/web3.js'

function replacePlaceholders(template: string, values: any) {
  return template.replace(/\${(\w+)}/g, (_: any, key: string) => values[key] || '')
}

Handlebars.registerHelper('decodeBase58', function(base58EncodedString) {
  return new web3.PublicKey(base58EncodedString).toBytes()
})

Handlebars.registerHelper('pda', function(...args) {
  let programId = new web3.PublicKey(args[args.length - 2])
  let seeds: Uint8Array[] = []
  for(let i = 0; i<args.length - 2; i++) {
      seeds.push(args[i])
  }
  let pdaResult = web3.PublicKey.findProgramAddressSync(seeds, programId)
  return pdaResult[0]
});

/*
  Pending Todo: input address by plane?
  E.g query order of an address (calculated from programId and some seeds) => need to support equation eval() with input params
*/
export function compileTriggerMsg(
  luxSender: string,
  intentId: string,
  action: string,
  prompt: any, // keep "any" for now so that we can improve schema as we go
  userInput: Object,
  defaultConst: Object
): MsgTriggerStrategies {
  // fill input into query + convert compiled query to fis query
  let querySchema = prompt.query
  let knownVars = { ...userInput, ...defaultConst }

  let fisQuery = FISQueryRequest.create({
    instructions: []
  })
  for (let ix of querySchema.instructions) {
    // replace vars within queries
    let inputs = []
    for (let i = 0; i < ix.input.length; i++) {
      // parse accounts input for SVM for now
      // we can propagate to other planes when it's needed
      if (ix.plane == Plane.SVM) {
        let input = Buffer.from(ix.input[i], 'base64').toString('latin1')
        console.log('input:', input)
        // only consider template, other stays unchanged
        if (input.startsWith("{{") && input.endsWith("}}")) {
          let templateSource = Handlebars.compile(input);
          const result = templateSource({
            ...userInput,
            ...defaultConst,
          });
          inputs.push(new web3.PublicKey(result).toBytes())
        }

        continue
      }

      // do normal parsing to get it backward compatible for now
      let input = Buffer.from(ix.input[i], 'base64')
      let replacedBytes = replacePlaceholders(input.toString('latin1'), knownVars)
      inputs.push(Buffer.from(replacedBytes, 'latin1'))
    }

    fisQuery.instructions.push(
      FISQueryInstruction.create({
        plane: planeFromJSON(ix.plane.toString()),
        action: queryActionFromJSON(ix.action),
        address: ix.address,
        input: inputs
      })
    )
  }
  //@ts-ignore
  let filteredInput: any = {}
  if (prompt.msg_fields) {
    for (let field in userInput) {
      if (prompt.msg_fields.includes(field)) {
        //@ts-ignore
        filteredInput[field] = userInput[field]
      }
    }
  }

  let strategyInput = {
    [action]: { ...filteredInput }
  }
  console.log('strategyInput', strategyInput)
  return MsgTriggerStrategies.create({
    sender: luxSender,
    ids: [intentId],
    inputs: [Buffer.from(JSON.stringify(strategyInput))],
    queries: [fisQuery]
  })
}
//@ts-ignore
export function parseTemplateToJSON(input: any) {
  const regex = /\${(\w+):(\w+)}/g
  let match: any
  const result = []

  let lastIndex = 0

  while ((match = regex.exec(input)) !== null) {
    if (match.index > lastIndex) {
      result.push(input.substring(lastIndex, match.index).trim())
    }

    result.push({
      name: match[1],
      type: match[2]
    })

    lastIndex = regex.lastIndex
  }

  if (lastIndex < input.length) {
    result.push(input.substring(lastIndex).trim())
  }

  // Flatten the result to remove any empty strings
  return result.flat().filter((item) => item !== '')
}

let metadataJSON = `{"groups":[{"name":"transfer helper","prompts":{"withdraw_all_planes":{"template":"withdraw \${denom:string} from planes to cosmos","msg_fields":[],"query":{"instructions":[{"plane":"COSMOS","action":"COSMOS_ASTROMESH_BALANCE","address":"","input":["JHt3YWxsZXR9","JHtkZW5vbX0="]}]}}}}]}`
