import { ThemedText } from '@/components/themed-text';
import { AppleButton, GoogleButton } from '@/components/ui/buttons';
import { GradientBackground } from '@/components/ui/gradient-background';
import { semanticColors } from '@/constants/color-tokens';
import { radius, spacing } from '@/constants/spacing-tokens';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

export default function AuthScreen() {
  return (
    <View style={styles.screen}>
      <GradientBackground />
      <View style={styles.content}>
        <Image source={require('@/assets/images/logo-hochu/logo.png')} style={styles.logo} contentFit="contain" />
        <Image
          source={require('@/assets/images/logo-hochu/logo-auth.png')}
          style={styles.logoAuth}
          contentFit="contain"
        />
        <View style={styles.imageContainer}>
          <Image source={require('@/assets/images/welcome-page/nice.png')} style={styles.image} contentFit="contain" />
          <Image source={require('@/assets/images/welcome-page/heart.png')} style={styles.image} contentFit="contain" />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.textContainerInner}>
            <ThemedText bold variant="displayLg">
              {'Your personal\nwishlist space'}
            </ThemedText>
            <ThemedText lightColor={semanticColors.dark.text.secondary} darkColor={semanticColors.dark.text.secondary}>
              Save, organize and share what you truly want
            </ThemedText>
          </View>
          <View style={styles.buttonsContainer}>
            <GoogleButton onPress={() => {}} title="Continue with Google" />
            <AppleButton onPress={() => {}} title="Continue with Apple" />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: spacing[10],
    backgroundColor: semanticColors.dark.bg.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: spacing[6],
  },
  textContainer: {
    alignItems: 'center',
    padding: spacing[6],
    marginHorizontal: spacing[4],
    gap: spacing[4],
    backgroundColor: semanticColors.light.bg.primary,
    borderRadius: radius.xxxl,
  },
  textContainerInner: {
    gap: spacing[2],
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 20,
    alignSelf: 'center',
    marginBottom: spacing[10],
  },
  logoAuth: {
    width: '100%',
    aspectRatio: 390 / 95,
    alignSelf: 'stretch',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: spacing[6],
  },
  image: {
    width: 62,
    height: 62,
    marginBottom: -spacing[4],
    zIndex: 1,
  },
  buttonsContainer: {
    gap: spacing[2],
    width: '100%',
  },
  button: {
    backgroundColor: semanticColors.light.action.secondaryBg,
    borderWidth: 1,
    borderColor: semanticColors.light.border.secondary,
    padding: spacing[4],
    borderRadius: radius.xxxl,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
