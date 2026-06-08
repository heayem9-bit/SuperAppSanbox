import { Share } from 'react-native';
import { ShareMessage } from '@/types/bridge.types';

export async function handleShare(message: ShareMessage): Promise<void> {
  try {
    await Share.share({
      message: message.payload.text,
    });
  } catch (error) {
    console.error('[Bridge] Error in handleShare:', error);
  }
}
