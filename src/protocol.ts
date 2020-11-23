export interface JSONMessage {
  id: string
  type: string
}

export interface JSONParseErrorMessage extends JSONMessage {
  type: 'ParseError'
  message: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface JSONMessageRequest extends Omit<JSONMessage, 'id'> {}

export function encode(obj: JSONMessage): string {
  // TODO: Basic validation that this is a JSONMessage
  console.log('inside encode')
  console.log(obj)
  console.log(JSON.stringify(obj))
  return JSON.stringify(obj)
}

export function decode(str: string): JSONMessage {
  console.log('inside decode')
  console.log(str)
  const messageContents = JSON.parse(str)
  if (!messageContents.hasOwnProperty('id') && !messageContents.hasOwnProperty('status')){
    console.log(messageContents)
    console.log('Response message from Sozu is not as we expected') // TODO: Basic validation that this is a JSONMessage
    throw Error('Ooops, Sozu does not like that')
  } else {
    console.log('looks like the response we were expecting')
    return messageContents
  } 
}

export function isJSONParseErrorMessage(obj: JSONMessage): obj is JSONParseErrorMessage {
  return obj.type === 'ParserError'
}
