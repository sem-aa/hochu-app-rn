import { useHeaderHeight } from '@react-navigation/elements';
import { useMemo } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

import { ClearInput, IconButton, ThemedText, ThemedView } from '@/shared/ui';
import { semanticColors, spacing } from '@/constants';
import { SymbolViewProps } from 'expo-symbols';

type FormInputProps = {
  value: string;
  placeholder: string;
  header: string;
  headerDescription: string;
  saveButtonTitle: string;
  iconButton: SymbolViewProps['name'];
  topContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
  hideInfoMessage?: boolean;
  onChangeText: (value: string) => void;
  onSave: () => void;
};

export function FormInput({
  value,
  placeholder,
  header,
  headerDescription,
  saveButtonTitle,
  iconButton,
  topContent,
  hideInfoMessage = false,
  bottomContent,
  onChangeText,
  onSave,
}: FormInputProps) {
  const isEmptyValue = useMemo(() => value.length === 0, [value]);
  const headerHeight = useHeaderHeight();
  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={headerHeight}
    >
      <ThemedView style={styles.container}>
        {topContent}
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <ThemedText variant="headingXl" bold>
              {header}
            </ThemedText>
            <ThemedText
              lightColor={semanticColors.dark.text.secondary}
              darkColor={semanticColors.light.text.secondary}
              variant="bodyMd"
            >
              {headerDescription}
            </ThemedText>
          </View>
          <View style={styles.inputContainer}>
            <ClearInput placeholder={placeholder} value={value} onChangeText={onChangeText} />
            {isEmptyValue && !hideInfoMessage && (
              <ThemedText
                lightColor={semanticColors.dark.text.secondary}
                darkColor={semanticColors.light.text.secondary}
                variant="bodyMd"
              >
                Введіть хоча б один символ
              </ThemedText>
            )}
          </View>
          {bottomContent}
        </View>
        <IconButton
          disabled={value.length === 0}
          style={styles.saveButton}
          icon={iconButton}
          title={saveButtonTitle}
          onPress={onSave}
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
});
