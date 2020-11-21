export class JSONClientError extends Error {}
export class ParserError extends JSONClientError {}
export class ServerParserError extends ParserError {}
export class ClientParserError extends ParserError {}
export class TimeoutError extends JSONClientError {}
export class ConnectionError extends JSONClientError {}
export class ConnectionClosedError extends ConnectionError {}
export class ConnectionRefusedError extends ConnectionError {}

export interface SysCallError extends Error {
  code: string
  errno: number
  syscall: string
}

export function isSysCallError(value: Error): value is SysCallError {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as SysCallError).code === 'string' &&
    typeof (value as SysCallError).errno === 'number' &&
    typeof (value as SysCallError).syscall === 'string'
  )
}

export function isFileNotFoundError(e: Error): boolean {
  return isSysCallError(e) && e.syscall == 'unlink' && e.code == 'ENOENT'
}
