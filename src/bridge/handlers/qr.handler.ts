import { Alert } from 'react-native';
import { ScanQrMessage } from '@/types/bridge.types';

export async function handleScanQr(message: ScanQrMessage): Promise<void> {
  Alert.alert(
    'QR Scanner',
    'QR Code Scanner was requested by the mini-app. (Simulated scanner action)',
    [{ text: 'OK' }]
  );
}
