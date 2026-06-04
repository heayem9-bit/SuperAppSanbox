import { handleOpenMap } from './handlers/map.handler';
import { BridgeMessage } from '@/types/bridge.types';

export { injectedBridge } from './native/bridge-injection';

/**
 * Parses and dispatches messages received from WebView.
 */
export async function handleBridgeMessage(eventData: string): Promise<void> {
  try {
    const data = JSON.parse(eventData) as BridgeMessage;

    switch (data.type) {
      case 'OPEN_MAP':
        await handleOpenMap(data);
        break;
      default:
        console.warn(`[Bridge] Unknown message type: ${(data as any).type}`);
    }
  } catch (error) {
    console.log('[Bridge] Message payload:', eventData);
    console.error('[Bridge] Error handling message:', error);
  }
}
