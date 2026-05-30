import { router } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IconButton } from '@/shared/ui/buttons';
import { ThemedText } from '@/shared/ui/themed';
import { ProfileAvatar } from '@/screens/profile/components/profile-avatar';
import { ROUTES, semanticColors, spacing } from '@/constants';
import { useLogoutMutation } from '@/features/auth';
import { useGetMeQuery } from '@/entities/user';
import { tokenStorage } from '@/shared/api/token-storage';
import { useAppDispatch } from '@/shared/store/hooks';
import { loggedOut } from '@/features/auth/model/auth.slice';

export default function ProfileScreen() {
  const { data: user, isLoading } = useGetMeQuery();
  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      const refreshToken = await tokenStorage.getRefresh();
      if (refreshToken) {
        await logout(refreshToken).unwrap();
      }
    } catch {
      await tokenStorage.clear();
      dispatch(loggedOut());
    } finally {
      router.replace(ROUTES.AUTH);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.headerContainer}>
        <View style={styles.headerContainerLeft}>
          <IconButton variant="secondary" icon="arrow.left" onPress={() => router.push(ROUTES.WISHLIST)} />
          <ThemedText variant="headingMd" bold>
            Ваш профіль
          </ThemedText>
        </View>
        <IconButton
          styleIcon={styles.moreMenu}
          variant="secondary"
          icon="ellipsis"
          onPress={() => router.push(ROUTES.PROFILE_MORE)}
        />
      </View>

      <View style={styles.profileContainerWrapper}>
        {isLoading ? (
          <View style={styles.profileContainer}>
            <ActivityIndicator />
          </View>
        ) : (
          <View style={styles.profileContainer}>
            <ProfileAvatar avatarUrl={user?.avatarUrl} name={user?.name} />

            <ThemedText variant="headingMd">{user?.name ?? '—'}</ThemedText>

            <ThemedText
              variant="bodyMd"
              lightColor={semanticColors.dark.text.secondary}
              darkColor={semanticColors.light.text.secondary}
            >
              {user?.email ?? '—'}
            </ThemedText>

            <IconButton
              size="sm"
              variant="secondary"
              icon="pencil"
              onPress={() => router.push(ROUTES.PROFILE_EDIT)}
              title="Редагувати імʼя"
            />
          </View>
        )}

        <View style={styles.logoutContainer}>
          <IconButton
            size="lg"
            variant="secondary"
            icon="arrow.right.square"
            onPress={handleLogout}
            disabled={isLogoutLoading}
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
