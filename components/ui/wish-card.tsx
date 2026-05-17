import { Image } from 'expo-image';
import { StyleSheet, View, type ViewStyle, type StyleProp } from 'react-native';

import { radius, semanticColors, spacing } from '@/constants';

import { ThemedText } from '../themed-text';

type WishCardProps = {
  style?: StyleProp<ViewStyle>;
};

export function WishCard({ style }: WishCardProps) {
  return (
    <View style={[styles.container, style]}>
      <Image source={require('@/assets/images/logo-hochu/logo-auth.png')} style={styles.image} contentFit="contain" />
      <View style={styles.contentContainer}>
        <ThemedText variant="headingSm" bold>
          Name
        </ThemedText>
        <ThemedText
          variant="bodyMd"
          lightColor={semanticColors.light.text.tertiary}
          darkColor={semanticColors.dark.text.tertiary}
        >
          Description
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: semanticColors.light.border.primary,
    backgroundColor: semanticColors.light.bg.primary,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  contentContainer: {
    padding: spacing[3],
  },
});
