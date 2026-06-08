export interface OpenMapMessage {
  type: 'OPEN_MAP';
  payload: {
    lat: number;
    lng: number;
  };
}

export interface ShareMessage {
  type: 'SHARE';
  payload: {
    text: string;
  };
}

export interface OpenCameraMessage {
  type: 'OPEN_CAMERA';
}

export interface ScanQrMessage {
  type: 'SCAN_QR';
}

export interface UserProfile {
  fullName: string;
  sex: string;
  nationality: string;
  phone: string;
  email: string;
  lang: string;
  dob: string;
  signature: string;
}

export interface SetBarTitleMessage {
  type: 'SET_BAR_TITLE';
  payload: {
    title: string;
    bgColor: string;
    color: string;
    safeAreaColor: string;
  };
}

export interface CloseMiniAppMessage {
  type: 'CLOSE_MINI_APP';
}

export type BridgeMessage =
  | OpenMapMessage
  | ShareMessage
  | OpenCameraMessage
  | ScanQrMessage
  | SetBarTitleMessage
  | CloseMiniAppMessage;

export interface BridgeCallbacks {
  onSetBarTitle?: (title: string, bgColor: string, color: string, safeAreaColor: string) => void;
  handleCloseMiniApp?: () => void;
}

