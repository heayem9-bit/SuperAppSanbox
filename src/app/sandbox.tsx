import { useLocalSearchParams } from 'expo-router';
import { SandboxView } from '@/features/sandbox/components/sandbox-view';

export default function SandboxScreen() {
  const { uri } = useLocalSearchParams();
  const decodedUri = uri ? decodeURIComponent(uri as string) : '';

  return <SandboxView decodedUri={decodedUri} />;
}
