import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IconButton, ThemedText, ThemedView } from '@/components';
import { radius, ROUTES, semanticColors, spacing } from '@/constants';

export default function ProfileScreen() {
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
              {'D'}
            </ThemedText>
          </ThemedView>
          <ThemedText variant="headingMd">Daria</ThemedText>
          <ThemedText
            variant="bodyMd"
            lightColor={semanticColors.dark.text.secondary}
            darkColor={semanticColors.light.text.secondary}
          >
            daria@gmail.com
          </ThemedText>

          <IconButton
            size="sm"
            variant={'secondary'}
            icon="pencil"
            onPress={() => router.push(ROUTES.PROFILE_EDIT)}
            title="Редагувати імʼя"
          />
        </View>
        <View style={styles.logoutContainer}>
          <IconButton
            size="lg"
            variant={'secondary'}
            icon="arrow.right.square"
            onPress={() => {
              router.push(ROUTES.AUTH);
            }}
            title="Вийти"
          />
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
