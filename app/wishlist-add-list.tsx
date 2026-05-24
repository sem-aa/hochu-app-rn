import { StyleSheet } from 'react-native';

import { ThemedText, ThemedView } from '@/components';

export default function WishlistAddList() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText variant="headingXl">Додати список</ThemedText>
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
