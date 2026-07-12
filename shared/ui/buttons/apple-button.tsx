import { SymbolView } from 'expo-symbols';
import { StyleSheet } from 'react-native';
import { MainButton } from './main-button';

type AppleButtonProp = {
  onPress: () => void;
  title: string;
  disabled?: boolean;
};

export function AppleButton({ onPress, title, disabled }: AppleButtonProp) {
  return (
    <MainButton style={styles.appleButton} onPress={onPress} variant={'secondary'} title={title} disabled={disabled}>
      <SymbolView name="apple.logo" size={18} tintColor="black" resizeMode="scaleAspectFit" style={styles.icon} />
    </MainButton>
  );
}

const styles = StyleSheet.create({
  appleButton: {
    width: '100%',
  },
  icon: {
    width: 18,
    height: 18,
  },
});
