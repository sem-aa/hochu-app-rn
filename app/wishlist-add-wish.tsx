import { StyleSheet } from 'react-native';

import { ThemedText, ThemedView } from '@/components';

export default function WishlistAddWish() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText variant="headingXl">Додати бажання</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
