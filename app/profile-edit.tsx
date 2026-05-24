import { useHeaderHeight } from '@react-navigation/elements';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

import { ClearInput, IconButton, ThemedText } from '@/components';
import { semanticColors, spacing } from '@/constants';

export default function ProfileEditScreen() {
  const headerHeight = useHeaderHeight();
  const [value, setValue] = useState('');
  const isEmptyValue = useMemo(() => value.length === 0, [value]);

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={headerHeight}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <ThemedText variant="headingXl" bold>
            Ваше імʼя
          </ThemedText>
          <ThemedText
            lightColor={semanticColors.dark.text.secondary}
            darkColor={semanticColors.light.text.secondary}
            variant="bodyMd"
          >
            Імʼя вашого профілю, яке побачать ті, з ким ви поділитесь вішлістом
          </ThemedText>
        </View>
        <View style={styles.inputContainer}>
          <ClearInput placeholder="Імʼя" value={value} onChangeText={setValue} />
          {isEmptyValue && (
            <ThemedText
              lightColor={semanticColors.dark.text.secondary}
              darkColor={semanticColors.light.text.secondary}
              variant="bodyMd"
            >
              Введіть хоча б один символ
            </ThemedText>
          )}
        </View>
      </View>
      <IconButton
        disabled={isEmptyValue}
        style={styles.saveButton}
        icon="checkmark"
        title="Зберегти"
        onPress={() => {
          router.back();
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-between',
    padding: spacing[4],
  },
  container: {
    gap: spacing[4],
    paddingBottom: spacing[4],
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
