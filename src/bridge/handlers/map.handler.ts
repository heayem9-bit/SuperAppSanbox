import { Linking } from 'react-native';
import { OpenMapMessage } from '@/types/bridge.types';

export async function handleOpenMap(message: OpenMapMessage): Promise<void> {
  const query = `${message.payload.lat},${message.payload.lng}`;
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  await Linking.openURL(url);
}