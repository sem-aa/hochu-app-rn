import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Alert, StyleSheet, View } from 'react-native';
import { useState } from 'react';

import { ThemedText } from '@/shared/ui/themed/themed-text';
import { AppleButton, GoogleButton, IconButton } from '@/shared/ui/buttons';
import { LabelInput } from '@/shared/ui/inputs';
import { GradientBackground } from '@/shared/ui/gradient-background';
import { semanticColors } from '@/constants/color-tokens';
import { ROUTES } from '@/constants/routes';
import { radius, spacing } from '@/constants/spacing-tokens';
import { useGoogleAuthMutation, getGoogleIdToken, useLoginMutation, useRegisterMutation } from '@/features/auth';
import { getAuthErrorMessage } from '@/shared/lib/helpers/errors-helper';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [googleAuth, { isLoading: isGoogleLoading }] = useGoogleAuthMutation();
  const isLoading = isGoogleLoading || isLoginLoading || isRegisterLoading;

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        await login({ email: email.trim(), password }).unwrap();
      } else {
        await register({ email: email.trim(), password, name: name.trim() }).unwrap();
      }
      router.replace(ROUTES.WISHLIST);
    } catch (e: unknown) {
      const message = getAuthErrorMessage(e);
      Alert.alert('Помилка', message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const idToken = await getGoogleIdToken();
      await googleAuth({ idToken }).unwrap();
      router.replace(ROUTES.WISHLIST);
    } catch (e: unknown) {
      const message = getAuthErrorMessage(e);
      Alert.alert('Помилка', message);
    }
  };

  const handleToggleMode = () => {
    setIsLogin((prev) => !prev);
    setEmail('');
    setPassword('');
    setName('');
  };

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
            <ThemedText
              bold
              variant="displayLg"
              style={styles.textContainerInnerText}
              lightColor={semanticColors.light.text.primary}
              darkColor={semanticColors.light.text.primary}
            >
              {'Твій простір бажань'}
            </ThemedText>
            <ThemedText
              style={styles.textContainerInnerText}
              lightColor={semanticColors.dark.text.secondary}
              darkColor={semanticColors.dark.text.secondary}
            >
              Зберігай, впорядковуй і ділись тим, чого хочеться
            </ThemedText>
          </View>
          <View style={styles.buttonsContainer}>
            <GoogleButton onPress={handleGoogleSignIn} disabled={isLoading} title="Увійти через Google" />
            <AppleButton disabled={true} onPress={() => router.push(ROUTES.WISHLIST)} title="Увійти через Apple" />
          </View>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.formContainerHeader}>
            <ThemedText>{isLogin ? 'Увійти' : 'Зареєструватися'}</ThemedText>
            <IconButton variant="secondary" icon="arrow.right.arrow.left" onPress={handleToggleMode} />
          </View>

          {!isLogin && (
            <LabelInput
              label="Ім'я"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              placeholder="Як тебе звати?"
              editable={!isLoading}
            />
          )}

          <LabelInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
            placeholder="example@mail.com"
            editable={!isLoading}
          />

          <LabelInput
            label="Пароль"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            placeholder="••••••••"
            editable={!isLoading}
          />

          <IconButton
            variant="secondary"
            icon="person.fill"
            title={isLogin ? 'Увійти' : 'Зареєструватися'}
            onPress={handleSubmit}
            disabled={isLoading}
          />
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
  textContainerInnerText: {
    textAlign: 'center',
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
  formContainerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formContainer: {
    gap: spacing[2],
    padding: spacing[4],
    backgroundColor: semanticColors.light.bg.primary,
    borderRadius: radius.xxxl,
    margin: spacing[4],
  },
});
