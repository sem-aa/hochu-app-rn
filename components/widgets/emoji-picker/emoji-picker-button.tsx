import { useState } from 'react';
import { Keyboard, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { MainButton, ThemedText } from '@/components';
import { spacing } from '@/constants';

import { EmojiPickerSheet } from './emoji-picker-sheet';

type EmojiPickerButtonProps = {
  value: string;
  onChange: (emoji: string) => void;
  style?: StyleProp<ViewStyle>;
};

export function EmojiPickerButton({ value, onChange, style }: EmojiPickerButtonProps) {
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const openPicker = () => {
    Keyboard.dismiss();
    setIsPickerVisible(true);
  };

  const handleSelect = (emoji: string) => {
    onChange(emoji);
    setIsPickerVisible(false);
  };

  return (
    <View style={style}>
      <MainButton variant="secondary" style={styles.button} onPress={openPicker}>
        <ThemedText>{value}</ThemedText>
      </MainButton>

      <EmojiPickerSheet
        visible={isPickerVisible}
        selectedEmoji={value}
        onClose={() => setIsPickerVisible(false)}
        onSelect={handleSelect}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[2],
    width: 44,
    height: 44,
  },
});
