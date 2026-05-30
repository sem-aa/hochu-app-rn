import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, TextInput, View } from 'react-native';

import { IconButton } from '@/components';
import { LabelInput } from '@/components/ui/inputs/label-input';
import { FormInput } from '@/components/widgets';
import { radius, semanticColors, spacing } from '@/constants';
import { useCreateWishMutation } from '@/features/wish';
import { buildCreateWishBody, getWishErrorMessage } from '@/features/wish/lib/build-create-wish-body';
import { useImageUpload } from '@/shared/hooks/use-image-upload';

type Props = {
  wishlistId: string;
};

export function WishlistAddWishModal({ wishlistId }: Props) {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [url, setUrl] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const [createWish, { isLoading }] = useCreateWishMutation();
  const { imageUri, imageUrl, isUploading, pickAndUpload, removeImage } = useImageUpload();

  const handleQuantityChange = (value: string) => {
    const num = Number(value);
    setQuantity(num > 0 ? String(num) : '');
  };

  const handleSave = async () => {
    if (!wishlistId) {
      Alert.alert('Помилка', 'Не знайдено список. Повернись назад і спробуй ще раз.');
      return;
    }

    const urlTrimmed = url.trim();
    if (urlTrimmed && !/^https?:\/\//i.test(urlTrimmed)) {
      Alert.alert('Помилка', 'Посилання має починатися з https://');
      return;
    }

    if (isUploading) {
      Alert.alert('Зачекай', 'Фото ще завантажується...');
      return;
    }

    if (imageUri && !imageUrl) {
      Alert.alert('Помилка', 'Фото не завантажилось. Спробуй вибрати ще раз.');
      return;
    }

    try {
      await createWish({
        wishlistId,
        ...buildCreateWishBody({ title, note, url, imageUrl, price, quantity }),
      }).unwrap();
      router.back();
    } catch (e: unknown) {
      Alert.alert('Помилка', getWishErrorMessage(e));
    }
  };

  const isBusy = isLoading || isUploading;

  return (
    <FormInput
      value={title}
      onChangeText={setTitle}
      header="Що хочеш?"
      headerDescription="Достатньо навіть просто назви"
      placeholder="Введи назву"
      saveButtonTitle={isBusy ? 'Збереження...' : 'Додати'}
      iconButton="plus"
      hideInfoMessage={true}
      onSave={handleSave}
      bottomContent={
        <View style={styles.bottomContentContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.imageContainer}>
              {isUploading ? (
                <ActivityIndicator color={semanticColors.light.text.secondary} />
              ) : imageUri ? (
                <>
                  <Image source={{ uri: imageUri }} style={styles.imagePreview} resizeMode="cover" />
                  <View style={styles.removePhotoOverlay}>
                    <IconButton
                      icon="trash.fill"
                      variant="secondary"
                      size="sm"
                      sizeIcon={14}
                      onPress={removeImage}
                      disabled={isBusy}
                    />
                  </View>
                </>
              ) : (
                <IconButton icon="photo" variant="secondary" onPress={pickAndUpload} disabled={isBusy} />
              )}
            </View>

            <TextInput
              style={styles.textInput}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              placeholder="Нотатка (не обов'язково)"
              value={note}
              onChangeText={setNote}
              editable={!isBusy}
            />
          </View>

          <LabelInput
            label="Вставте посилання"
            placeholder="https://..."
            value={url}
            onChangeText={setUrl}
            keyboardType="url"
            autoCapitalize="none"
            editable={!isBusy}
          />

          <View style={styles.rowContainer}>
            <LabelInput
              style={styles.priceInput}
              label="Ціна"
              placeholder="0.00"
              value={price}
              onChangeText={setPrice}
              keyboardType="decimal-pad"
              editable={!isBusy}
              rightSlot={
                <IconButton
                  style={styles.priceButton}
                  icon="chevron.down"
                  title="UAH"
                  onPress={() => {}}
                  sizeIcon={12}
                />
              }
            />
            <LabelInput
              style={styles.quantityInput}
              containerStyle={styles.quantityInputContainer}
              label="Кількість"
              value={quantity}
              onChangeText={handleQuantityChange}
              keyboardType="numeric"
              textAlign="center"
              contextMenuHidden
              selectTextOnFocus={false}
              editable={!isBusy}
              leftSlot={
                <IconButton
                  variant="secondary"
                  icon="minus"
                  size="sm"
                  sizeIcon={12}
                  onPress={() =>
                    setQuantity((prev) => (Number(prev) > 1 ? String(Number(prev) - 1) : ''))
                  }
                />
              }
              rightSlot={
                <IconButton
                  variant="secondary"
                  icon="plus"
                  size="sm"
                  sizeIcon={12}
                  onPress={() =>
                    setQuantity((prev) => String(Number(prev) + 1))
                  }
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
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: semanticColors.light.border.secondary,
    borderRadius: radius.xl,
    overflow: 'hidden',
    height: 120,
    width: 120,
  },
  imagePreview: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  removePhotoOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  textInput: {
    flex: 1,
    height: 120,
    borderWidth: 1,
    borderColor: semanticColors.light.border.secondary,
    borderRadius: radius.xxl,
    padding: spacing[4],
  },
  priceInput: {
    flex: 1,
    minWidth: 0,
  },
  priceButton: {
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
  },
  quantityInput: {
    width: '35%',
    minWidth: 0,
    flexShrink: 0,
  },
  quantityInputContainer: {
    paddingHorizontal: spacing[2],
  },
});
