import { useState } from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';

import { BaseInput, ButtonVariant, IconButton, ThemedText, WishCard } from '@/components';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { spacing } from '@/constants';

const GAP = 8;
const COLUMNS = 2;

export default function ComponentsTabScreen() {
  const [value, setValue] = useState('');
  const { width } = useWindowDimensions();
  const horizontalPadding = spacing[4] * 2;
  const cardWidth = (width - horizontalPadding - GAP * (COLUMNS - 1)) / COLUMNS;

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
          <IconButton variant={ButtonVariant.SECONDARY} icon="person.fill" onPress={() => {}} />
          <IconButton variant={ButtonVariant.SECONDARY} icon="square.grid.2x2.fill" onPress={() => {}} />
        </View>
        <View style={styles.buttonContainerContent}>
          <IconButton variant={ButtonVariant.PRIMARY} icon="plus" onPress={() => {}} />
          <IconButton variant={ButtonVariant.PRIMARY} icon="plus" onPress={() => {}} title="Create new list" />
          <IconButton variant={ButtonVariant.SECONDARY} icon="xmark" onPress={() => {}} />
        </View>
        <BaseInput placeholder="Placeholder" value={value} onChangeText={setValue} />
        <BaseInput
          placeholder="Placeholder"
          value={value}
          onChangeText={setValue}
          rightSlot={<IconButton variant={ButtonVariant.SECONDARY} icon="xmark" onPress={() => {}} sizeIcon={12} />}
        />
        <BaseInput
          placeholder="Placeholder"
          containerStyle={styles.inputContainer}
          value={value}
          onChangeText={setValue}
          leftSlot={<IconSymbol name={'magnifyingglass'} size={20} color={'#737373'} />}
          rightSlot={<IconButton variant={ButtonVariant.SECONDARY} icon="xmark" onPress={() => {}} sizeIcon={12} />}
        />

        <View style={styles.wishCardContainer}>
          <WishCard style={{ width: cardWidth }} />
          <WishCard style={{ width: cardWidth }} />
          <WishCard style={{ width: cardWidth }} />
          <WishCard style={{ width: cardWidth }} />
          <WishCard style={{ width: cardWidth }} />
          <WishCard style={{ width: cardWidth }} />
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
    gap: GAP,
  },
});
