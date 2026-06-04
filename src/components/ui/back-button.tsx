import { TouchableOpacity } from 'react-native';
import { SymbolView } from 'expo-symbols';

export function BackButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ paddingRight: 10 }}>
      <SymbolView
        name={{ ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' }}
        tintColor="white"
        size={24}
      />
    </TouchableOpacity>
  );
}
