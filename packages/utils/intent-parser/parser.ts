import {
  FISQueryInstruction,
  FISQueryRequest,
  queryActionFromJSON
} from '../../../chain/flux/astromesh/v1beta1/query'
import { Plane, planeFromJSON, planeToJSON } from '../../../chain/flux/astromesh/v1beta1/tx'
import {
  Schema,
  SchemaFISQuery,
  SchemaPrompt,
  StrategyMetadata
} from '../../../chain/flux/strategy/v1beta1/strategy'
import { MsgTriggerStrategies } from '../../../chain/flux/strategy/v1beta1/tx'

function replaceTypedPlaceholders(template, values) {
  return template.replace(/\${(\w+:\w+)}/g, (_, key: string) => values[key] || '')
}

function replacePlaceholders(template, values) {
  return template.replace(/\${(\w+)}/g, (_, key: string) => values[key] || '')
}

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
      let input = Buffer.from(ix.input[i], 'base64')
      inputs.push(Buffer.from(replacePlaceholders(input.toString('ascii'), knownVars)))
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

  let filteredInput = {}
  if (prompt.msg_fields) {
    for (let field in userInput) {
      if (prompt.msg_fields.includes(field)) {
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

export function parseTemplateToJSON(input) {
  const regex = /\${(\w+):(\w+)}/g
  let match
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
