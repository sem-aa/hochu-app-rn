import { FlatList, Modal, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText, ThemedView } from '@/components';
import { radius, semanticColors, spacing } from '@/constants';

import { EMOJI_CATEGORIES } from './emoji-data';

type EmojiPickerSheetProps = {
  visible: boolean;
  selectedEmoji: string;
  onClose: () => void;
  onSelect: (emoji: string) => void;
};

const EMOJI_SIZE = 44;
const EMOJI_COLUMNS = 6;

export function EmojiPickerSheet({ visible, selectedEmoji, onClose, onSelect }: EmojiPickerSheetProps) {
  const { bottom } = useSafeAreaInsets();

  const handleSelect = (emoji: string) => {
    onSelect(emoji);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} accessibilityRole="button" />

        <ThemedView style={[styles.sheet, { paddingBottom: bottom + spacing[4] }]}>
          <View style={styles.handle} />
          <ThemedText variant="headingMd" bold style={styles.title}>
            Обери emoji
          </ThemedText>

          <FlatList
            data={EMOJI_CATEGORIES}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            renderItem={({ item: category }) => (
              <View style={styles.category}>
                <ThemedText
                  variant="bodyMd"
                  bold
                  lightColor={semanticColors.light.text.secondary}
                  darkColor={semanticColors.dark.text.secondary}
                  style={styles.categoryTitle}
                >
                  {category.title}
                </ThemedText>

                <View style={styles.grid}>
                  {category.emojis.map((emoji) => {
                    const isSelected = emoji === selectedEmoji;

                    return (
                      <Pressable
                        key={`${category.id}-${emoji}`}
                        accessibilityRole="button"
                        accessibilityLabel={`Emoji ${emoji}`}
                        onPress={() => handleSelect(emoji)}
                        style={[styles.emojiCell, isSelected && styles.emojiCellSelected]}
                      >
                        <ThemedText variant="headingLg">{emoji}</ThemedText>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            )}
          />
        </ThemedView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  sheet: {
    maxHeight: '70%',
    borderTopLeftRadius: radius.xxl,
    borderTopRightRadius: radius.xxl,
    paddingTop: spacing[2],
    paddingHorizontal: spacing[4],
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: radius.full,
    backgroundColor: semanticColors.light.border.secondary,
    marginBottom: spacing[4],
  },
  title: {
    marginBottom: spacing[4],
  },
  listContent: {
    paddingBottom: spacing[2],
    gap: spacing[4],
  },
  category: {
    gap: spacing[2],
  },
  categoryTitle: {
    marginBottom: spacing[1],
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[1],
    width: '100%',
    maxWidth: EMOJI_COLUMNS * (EMOJI_SIZE + spacing[1]),
  },
  emojiCell: {
    width: EMOJI_SIZE,
    height: EMOJI_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.lg,
  },
  emojiCellSelected: {
    backgroundColor: semanticColors.light.bg.tertiary,
  },
});
