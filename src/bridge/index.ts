import { BridgeCallbacks, BridgeMessage, UserProfile } from '@/types/bridge.types';
import { handleOpenCamera } from './handlers/camera.handler';
import { handleOpenMap } from './handlers/map.handler';
import { handleScanQr } from './handlers/qr.handler';
import { handleShare } from './handlers/share.handler';
import { handleSetBarTitle } from './handlers/title.handler';
import { handleCloseMiniApp } from './handlers/closeMiniApp.handler';

export { injectedBridge } from './native/bridge-injection';

/**
 * Pushes the user profile to the mini app running inside the WebView.
 * The WebView must expose `window.onGetProfile(profile)` to receive the data.
 */
export function getProfile(
  webViewRef: React.RefObject<any>,
  decodedProfile: UserProfile
): void {
  const script = `
    if (typeof window.NativeBridge !== 'undefined') {
      window.NativeBridge.getProfile(${JSON.stringify(decodedProfile)});
    }
    true;
  `;
  webViewRef.current?.injectJavaScript(script);
}

/**
 * Parses and dispatches messages received from WebView.
 */
export async function handleBridgeMessage(
  eventData: string,
  callbacks?: BridgeCallbacks
): Promise<void> {
  try {
    const data = JSON.parse(eventData) as BridgeMessage;

    switch (data.type) {
      case 'OPEN_MAP':
        await handleOpenMap(data);
        break;
      case 'SHARE':
        await handleShare(data);
        break;
      case 'OPEN_CAMERA':
        await handleOpenCamera(data);
        break;
      case 'SCAN_QR':
        await handleScanQr(data);
        break;
      case 'SET_BAR_TITLE':
        handleSetBarTitle(data, callbacks?.onSetBarTitle);
        break;
      case 'CLOSE_MINI_APP':
        if (callbacks?.handleCloseMiniApp) {
          await handleCloseMiniApp(callbacks.handleCloseMiniApp);
        }
        break;
      default:
        console.warn(`[Bridge] Unknown message type: ${(data as any).type}`);
    }
  } catch (error) {
    console.log('[Bridge] Message payload:', eventData);
    console.error('[Bridge] Error handling message:', error);
  }
}

