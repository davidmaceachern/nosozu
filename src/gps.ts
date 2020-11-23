import { JSONClient } from './jsonClient'
import { JSONMessage } from './protocol'

export interface Position extends JSONMessage {
  long: number
  lat: number
  speed: number
}

function isPosition(obj: JSONMessage): obj is Position {
  // TODO: Validate this is a position
  return true
}

export class GpsClient extends JSONClient {
  async getLatestPosition(): Promise<Position> {
    const response = await this.request({ type: 'GetLatestPosition' })
    if (isPosition(response)) {
      return response
    } else {
      throw new Error(`Failed validation of position`)
    }
  }
}
