import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IconButton, ThemedText, ThemedView } from '@/components';
import { radius, semanticColors, spacing } from '@/constants';
import { ROUTES, parseProfileParams } from '@/navigation';
import { router, useLocalSearchParams } from 'expo-router';

export default function ProfileScreen() {
  const params = useLocalSearchParams<{ name?: string; email?: string }>();
  const { name, email, error } = parseProfileParams(params);
  const avatarLetter = name.charAt(0).toUpperCase();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.headerContainer}>
        <View style={styles.headerContainerLeft}>
          <IconButton variant={'secondary'} icon="arrow.left" onPress={() => router.push(ROUTES.WISHLIST)} />
          <ThemedText variant="headingMd" bold>
            Ваш профіль
          </ThemedText>
        </View>
        <IconButton
          styleIcon={styles.moreMenu}
          variant={'secondary'}
          icon="ellipsis"
          onPress={() => router.push(ROUTES.PROFILE_MORE)}
        />
      </View>
      <View style={styles.profileContainerWrapper}>
        <View style={styles.profileContainer}>
          <ThemedView
            style={styles.profilePhoto}
            lightColor={semanticColors.light.bg.primary}
            darkColor={semanticColors.dark.bg.primary}
          >
            <ThemedText
              variant="displayLg"
              bold
              lightColor={semanticColors.dark.text.primary}
              darkColor={semanticColors.dark.text.primary}
            >
              {avatarLetter}
            </ThemedText>
          </ThemedView>
          <ThemedText variant="headingMd">{name}</ThemedText>
          <ThemedText
            variant="bodyMd"
            lightColor={semanticColors.dark.text.secondary}
            darkColor={semanticColors.light.text.secondary}
          >
            {email}
          </ThemedText>
          {error ? (
            <ThemedText
              variant="bodySm"
              lightColor={semanticColors.light.feedback.dangerFg}
              darkColor={semanticColors.dark.feedback.dangerFg}
              center
            >
              {error}
            </ThemedText>
          ) : null}
          <IconButton
            size="sm"
            variant={'secondary'}
            icon="pencil"
            onPress={() => router.push(ROUTES.PROFILE_EDIT)}
            title="Редагувати імʼя"
          />
        </View>
        <View style={styles.logoutContainer}>
          <IconButton size="lg" variant={'secondary'} icon="arrow.right.square" onPress={() => {}} title="Вийти" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing[4],
  },
  headerContainerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[4],
  },
  moreMenu: {
    transform: [{ rotate: '90deg' }],
  },
  profileContainerWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: spacing[4],
  },
  profilePhoto: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: radius.full,
    backgroundColor: semanticColors.dark.bg.primary,
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[4],
  },
  logoutContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
