import { useHeaderHeight } from '@react-navigation/elements';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

import { BaseInput, IconButton, ThemedText, ThemedView } from '@/shared/ui';
import { semanticColors, spacing } from '@/constants';
import { useClipboardText } from '@/shared/hooks/use-clipboard-text';

export function AddWishAuto() {
  const [value, setValue] = useState('');
  const headerHeight = useHeaderHeight();
  const { hasClipboardText, pasteFromClipboard } = useClipboardText();

  const handlePaste = async () => {
    const text = await pasteFromClipboard();

    if (text) {
      setValue(text);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={headerHeight}
    >
      <ThemedView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <ThemedText variant="headingXl" bold>
              Що хочеш?
            </ThemedText>
            <ThemedText
              lightColor={semanticColors.dark.text.secondary}
              darkColor={semanticColors.light.text.secondary}
              variant="bodyMd"
            >
              Встав посилання — і готово
            </ThemedText>
          </View>
          <View style={styles.inputContainer}>
            <BaseInput
              rightSlot={
                value.length > 0 ? (
                  <IconButton
                    icon="xmark"
                    variant="secondary"
                    sizeIcon={12}
                    onPress={() => setValue('')}
                    style={styles.iconButton}
                  />
                ) : hasClipboardText ? (
                  <IconButton
                    icon="doc.on.doc"
                    size="sm"
                    title="Вставити"
                    onPress={handlePaste}
                    style={styles.iconButton}
                  />
                ) : undefined
              }
              placeholder="Встав посилання"
              value={value}
              onChangeText={setValue}
            />
          </View>
        </View>
        <IconButton
          disabled={value.length === 0}
          style={styles.saveButton}
          icon={'arrow.right'}
          title="Продовжити"
          onPress={() => {
            console.log('save');
          }}
        />
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    gap: spacing[2],
  },
  container: {
    flex: 1,
    gap: spacing[2],
    padding: spacing[4],
  },
  inputContainer: {
    gap: spacing[2],
  },
  headerContainer: {
    gap: spacing[2],
  },
  saveButton: {
    marginBottom: spacing[12],
  },
  iconButton: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderColor: 'white',
  },
});
