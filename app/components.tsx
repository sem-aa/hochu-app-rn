import { useState } from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';

import { BaseInput, IconButton, ThemedText, WishCard } from '@/components';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { spacing } from '@/constants';
import { getWishCardWidth, WISH_GRID_GAP } from '@/shared/lib/wish-grid';
import type { WishCardData } from '@/components/ui/wish-card';

const DEMO_WISHES: WishCardData[] = [
  { id: '1', title: 'Навушники', note: 'Чорний колір', imageUrl: null, price: '12999', currency: 'UAH', status: 'ACTIVE' },
  { id: '2', title: 'Книга', note: null, imageUrl: null, price: '350', currency: 'UAH', status: 'ACTIVE' },
  { id: '3', title: 'Плед', note: null, imageUrl: null, price: null, currency: 'UAH', status: 'FULFILLED' },
];

export default function ComponentsTabScreen() {
  const [value, setValue] = useState('');
  const { width } = useWindowDimensions();
  const cardWidth = getWishCardWidth(width);

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ThemedText variant="displayLg">displayLg</ThemedText>
        <ThemedText variant="headingXl">headingXl</ThemedText>
        <ThemedText variant="headingLg">headingLg</ThemedText>

        <View style={styles.buttonContainerHeader}>
          <IconButton variant={'secondary'} icon="person.fill" onPress={() => {}} />
          <IconButton variant={'secondary'} icon="square.grid.2x2.fill" onPress={() => {}} />
        </View>
        <View style={styles.buttonContainerContent}>
          <IconButton icon="plus" onPress={() => {}} />
          <IconButton icon="plus" onPress={() => {}} title="Create new list" />
          <IconButton variant={'secondary'} icon="xmark" onPress={() => {}} />
        </View>
        <BaseInput placeholder="Placeholder" value={value} onChangeText={setValue} />
        <BaseInput
          placeholder="Placeholder"
          value={value}
          onChangeText={setValue}
          rightSlot={<IconButton variant={'secondary'} icon="xmark" onPress={() => {}} sizeIcon={12} />}
        />
        <BaseInput
          placeholder="Placeholder"
          containerStyle={styles.inputContainer}
          value={value}
          onChangeText={setValue}
          leftSlot={<IconSymbol name={'magnifyingglass'} size={20} color={'#737373'} />}
          rightSlot={<IconButton variant={'secondary'} icon="xmark" onPress={() => {}} sizeIcon={12} />}
        />

        <View style={styles.wishCardContainer}>
          {DEMO_WISHES.map((wish) => (
            <WishCard key={wish.id} wish={wish} wishlistId="demo" style={{ width: cardWidth }} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: spacing[10],
  },
  buttonContainerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainerContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  scroll: {
    padding: spacing[4],
    paddingBottom: spacing[8],
    gap: spacing[5],
  },
  subtitle: {
    marginBottom: spacing[3],
    opacity: 0.85,
  },
  inputContainer: {
    paddingHorizontal: spacing[8],
  },
  wishCardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: WISH_GRID_GAP,
  },
});
