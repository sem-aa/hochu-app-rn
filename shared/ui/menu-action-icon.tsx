import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, View } from 'react-native';

const ICON_SIZE = 22;

export type MenuActionIconName = 'edit' | 'share' | 'delete';

type MenuActionIconProps = {
  name: MenuActionIconName;
  color: string;
};

export function MenuActionIcon({ name, color }: MenuActionIconProps) {
  return (
    <View style={styles.container}>
      <MaterialIcons name={name} size={ICON_SIZE} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
