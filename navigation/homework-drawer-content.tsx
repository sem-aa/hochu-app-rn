/**
 * Drawer-menu for the task (Stack / Tab / Drawer).
 * TODO(DZ): Delete after sending the task. not used in the final application.
 */
import { DrawerContentScrollView, DrawerItem, type DrawerContentComponentProps } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { HelloWave, ThemedText } from '@/components';
import { semanticColors, spacing } from '@/constants';

import { SafeAreaView } from 'react-native-safe-area-context';
import { DRAWER_ROUTES, type DrawerRoute } from './routes';

export function HomeworkDrawerContent(props: DrawerContentComponentProps) {
  const navigate = (href: DrawerRoute) => {
    router.push(href);
    props.navigation.closeDrawer();
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <ThemedText variant="headingMd" bold>
            Меню Drawer <HelloWave />
          </ThemedText>
        </View>

        <DrawerItem label="Головна" onPress={() => navigate(DRAWER_ROUTES.HOME)} />
        <DrawerItem label="Профіль" onPress={() => navigate(DRAWER_ROUTES.PROFILE)} />
        <DrawerItem label="Components" onPress={() => navigate(DRAWER_ROUTES.COMPONENTS)} />
      </SafeAreaView>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing[6],
  },
  header: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[4],
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: semanticColors.light.border.primary,
    marginBottom: spacing[2],
  },
});
