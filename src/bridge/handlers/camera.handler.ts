import { Alert } from 'react-native';
import { OpenCameraMessage } from '@/types/bridge.types';

export async function handleOpenCamera(message: OpenCameraMessage): Promise<void> {
  Alert.alert(
    'Camera',
    'Camera was requested by the mini-app. (Simulated camera action)',
    [{ text: 'OK' }]
  );
}
