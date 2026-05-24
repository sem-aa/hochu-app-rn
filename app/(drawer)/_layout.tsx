/**
 * Drawer Navigator — task from the course.
 * TODO(DZ): Delete after sending the task. this component and library.
 */
import { Drawer } from 'expo-router/drawer';

import { HomeworkDrawerContent } from '@/navigation/homework-drawer-content';

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <HomeworkDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        swipeEnabled: true,
        drawerType: 'front',
      }}
    >
      <Drawer.Screen name="(tabs)" options={{ drawerItemStyle: { display: 'none' } }} />
    </Drawer>
  );
}
