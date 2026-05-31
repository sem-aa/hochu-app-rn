import * as Clipboard from 'expo-clipboard';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { AppState } from 'react-native';

export function useClipboardText() {
  const [hasClipboardText, setHasClipboardText] = useState(false);

  const checkClipboard = useCallback(async () => {
    try {
      const hasText = await Clipboard.hasStringAsync();

      if (!hasText) {
        setHasClipboardText(false);
        return;
      }

      const text = await Clipboard.getStringAsync();
      setHasClipboardText(Boolean(text.trim()));
    } catch {
      setHasClipboardText(false);
    }
  }, []);

  const pasteFromClipboard = useCallback(async () => {
    try {
      const text = (await Clipboard.getStringAsync()).trim();
      return text || null;
    } catch {
      return null;
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      checkClipboard();
    }, [checkClipboard]),
  );

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState) => {
      if (nextState === 'active') {
        checkClipboard();
      }
    });

    return () => subscription.remove();
  }, [checkClipboard]);

  return {
    hasClipboardText,
    pasteFromClipboard,
    checkClipboard,
  };
}
