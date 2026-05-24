import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { IconButton } from '@/components';
import { LabelInput } from '@/components/ui/inputs/label-input';
import { FormInput } from '@/components/widgets';
import { radius, semanticColors, spacing } from '@/constants';

export function WishlistAddWishModal() {
  const [value, setValue] = useState('');
  const [note, setNote] = useState('');
  const [quantity, setQuantity] = useState('');
  const onQuantityChange = (value: string) => {
    setQuantity(value);
    if (Number(value) > 0) {
      setQuantity(String(Number(value)));
    } else {
      setQuantity('');
    }
  };

  return (
    <FormInput
      value={value}
      onChangeText={setValue}
      header="Що хочеш?"
      headerDescription="Достатньо навіть просто назви"
      placeholder="Введи назву"
      saveButtonTitle="Додати"
      iconButton="plus"
      hideInfoMessage={true}
      onSave={() => {
        console.log('save');
      }}
      bottomContent={
        <View style={styles.bottomContentContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.imageContainer}>
              <IconButton
                icon="photo"
                variant="secondary"
                onPress={() => {
                  console.log('save');
                }}
              />
            </View>
            <TextInput
              style={styles.textInput}
              multiline
              numberOfLines={4}
              textAlignVertical="top" // Android — текст сверху
              placeholder="Нотатка (не обов'язково)"
              value={note}
              onChangeText={setNote}
            />
          </View>
          <LabelInput label="Вставте посилання" placeholder="Введи посилання" />
          <View style={styles.rowContainer}>
            <LabelInput
              style={styles.priceInput}
              rightSlot={
                <IconButton
                  style={styles.priceButton}
                  icon="chevron.down"
                  title="UAH"
                  onPress={() => {}}
                  sizeIcon={12}
                />
              }
              label="Ціна"
              placeholder="Ціна"
            />
            <LabelInput
              style={styles.fillInput}
              containerStyle={styles.fillInputContainer}
              label="Кількість"
              value={quantity}
              onChangeText={onQuantityChange}
              keyboardType="numeric"
              textAlign="center"
              contextMenuHidden
              selectTextOnFocus={false}
              rightSlot={
                <IconButton
                  variant="secondary"
                  icon="plus"
                  size="sm"
                  onPress={() =>
                    setQuantity((prev) => {
                      const newQuantity = Number(prev) + 1;
                      return newQuantity > 0 ? String(newQuantity) : '';
                    })
                  }
                  sizeIcon={12}
                />
              }
              leftSlot={
                <IconButton
                  variant="secondary"
                  icon="minus"
                  size="sm"
                  onPress={() =>
                    setQuantity((prev) => {
                      if (Number(prev) > 0) {
                        return String(Number(prev) - 1);
                      }
                      return '';
                    })
                  }
                  sizeIcon={12}
                />
              }
            />
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  bottomContentContainer: {
    gap: spacing[4],
  },
  rowContainer: {
    flexDirection: 'row',
    gap: spacing[2],
    alignItems: 'flex-start',
  },
  priceInput: {
    flex: 1,
    minWidth: 0,
  },
  fillInput: {
    width: '35%',
    minWidth: 0,
    flexShrink: 0,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: semanticColors.light.border.secondary,
    borderRadius: radius.xl,
    padding: spacing[2],
    height: 120,
    width: 120,
  },
  textInput: {
    flex: 1,
    height: 120,
    borderWidth: 1,
    borderColor: semanticColors.light.border.secondary,
    borderRadius: radius.xxl,
    padding: spacing[4],
  },
  priceButton: {
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
  },
  inputContainer: {
    paddingHorizontal: spacing[8],
  },
  fillInputContainer: {
    paddingHorizontal: spacing[2],
  },
});
