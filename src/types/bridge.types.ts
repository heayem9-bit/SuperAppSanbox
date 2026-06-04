export interface OpenMapMessage {
  type: 'OPEN_MAP';
  lat: number;
  lng: number;
}

export type BridgeMessage = OpenMapMessage;
