import { TouchableOpacity } from 'react-native';
import { SymbolView } from 'expo-symbols';

function BackButton({ onPress }: any) {
  return (
    <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 10 }}>
      <SymbolView
        name={{ ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' }}
        tintColor="white"
        size={24}
      />
    </TouchableOpacity>
  );
}

export { BackButton };