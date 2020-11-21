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
  return JSON.stringify(obj)
}

export function decode(str: string): JSONMessage {
  // TODO: Basic validation that this is a JSONMessage
  return JSON.parse(str)
}

export function isJSONParseErrorMessage(obj: JSONMessage): obj is JSONParseErrorMessage {
  return obj.type === 'ParserError'
}
