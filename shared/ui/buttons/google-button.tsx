import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import { MainButton } from './main-button';

type GoogleButtonProp = {
  onPress: () => void;
  title: string;
  disabled?: boolean;
};

export function GoogleButton({ onPress, title, disabled }: GoogleButtonProp) {
  return (
    <MainButton style={styles.googleButton} onPress={onPress} variant={'secondary'} title={title} disabled={disabled}>
      <Image source={require('@/assets/svg/google.svg')} style={{ width: 18, height: 18 }} />
    </MainButton>
  );
}

const styles = StyleSheet.create({
  googleButton: {
    width: '100%',
  },
});
