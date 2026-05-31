import FontAwesome from '@expo/vector-icons/FontAwesome';
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
      <FontAwesome name={'apple'} size={18} color={'black'} />
    </MainButton>
  );
}

const styles = StyleSheet.create({
  appleButton: {
    width: '100%',
  },
});
