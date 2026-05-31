import { forwardRef, useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

import { componentColors, semanticColors } from '@/constants/color-tokens';
import { radius, spacing } from '@/constants/spacing-tokens';
import { typography } from '@/constants/typography-tokens';
import { useColorScheme } from '@/shared/hooks/use-color-scheme';

const INPUT_FONT_SIZE = typography.bodyMd.fontSize;

export type TextFieldProps = {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorText?: string;
} & TextInputProps;

export const TextField = forwardRef<TextInput, TextFieldProps>(function TextField(
  { label, helperText, error = false, errorText, editable = true, multiline = false, style, onFocus, onBlur, ...rest },
  ref,
) {
  const scheme = useColorScheme() ?? 'light';
  const inputColors = componentColors[scheme].input;
  const semantic = semanticColors[scheme];

  const [focused, setFocused] = useState(false);
  const disabled = editable === false;

  const showError = Boolean(error);
  const message = showError ? (errorText ?? 'Error') : helperText;
  const messageColor = showError ? semantic.feedback.dangerFg : semantic.text.tertiary;

  const borderColor = (() => {
    if (showError) return inputColors.borderError;
    if (disabled) return semantic.border.disabled;
    if (focused) return inputColors.borderFocus;
    return inputColors.border;
  })();

  const minHeight = multiline ? 120 : 48;

  return (
    <View style={styles.root}>
      {label ? (
        <Text style={[typography.labelMd, { color: disabled ? semantic.text.disabled : semantic.text.secondary }]}>
          {label}
        </Text>
      ) : null}
      <View
        style={[
          styles.field,
          {
            borderColor,
            backgroundColor: inputColors.bg,
            borderRadius: radius.xxl,
            minHeight,
            opacity: disabled ? 0.85 : 1,
            justifyContent: multiline ? 'flex-start' : 'center',
            overflow: 'hidden',
          },
        ]}
      >
        <TextInput
          ref={ref}
          editable={editable}
          multiline={multiline}
          placeholderTextColor={inputColors.placeholder}
          selectionColor={semantic.action.primaryBg}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          style={[
            styles.inputBase,
            multiline
              ? [typography.bodyMd, styles.inputMultilineInner]
              : [styles.inputSingle, Platform.OS === 'android' ? { textAlignVertical: 'center' as const } : null],
            { color: disabled ? semantic.text.disabled : inputColors.text },
            style,
          ]}
          {...rest}
        />
      </View>
      {message ? <Text style={[typography.caption, { color: messageColor }]}>{message}</Text> : null}
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    gap: spacing[2],
    width: '100%',
  },
  field: {
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: spacing[3],
    justifyContent: 'center',
  },
  inputBase: {
    width: '100%',
    paddingVertical: 0,
    margin: 0,
  },
  inputSingle: {
    fontSize: INPUT_FONT_SIZE,
  },
  inputMultilineInner: {
    minHeight: 80,
    paddingTop: spacing[3],
    paddingBottom: spacing[3],
    textAlignVertical: 'top',
  },
});
