import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, TextInput, View } from 'react-native';

import { IconButton } from '@/shared/ui/buttons';
import { LabelInput } from '@/shared/ui/inputs/label-input';
import { FormInput } from '@/shared/widgets/forms';
import { radius, semanticColors, spacing } from '@/constants';
import { buildCreateWishBody, getWishErrorMessage, useUpdateWishMutation } from '@/entities/wish';
import { useGetWishlistQuery } from '@/entities/wishlist';
import { useImageUpload } from '@/shared/hooks/use-image-upload';

type WishEditParams = {
  wishId: string;
  wishlistId: string;
};

function normalizeQuantity(value: number | undefined): string {
  return value && value > 0 ? String(value) : '1';
}

export function WishlistWishEditModal() {
  const { wishId, wishlistId } = useLocalSearchParams<WishEditParams>();

  const { data: wishlist, isLoading } = useGetWishlistQuery(wishlistId ?? '', { skip: !wishlistId });
  const wish = wishlist?.wishes.find((item) => item.id === wishId);

  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [url, setUrl] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [initialImageUrl, setInitialImageUrl] = useState<string | null>(null);
  const [imageRemoved, setImageRemoved] = useState(false);

  const [updateWish, { isLoading: isSaving }] = useUpdateWishMutation();
  const { imageUri, imageUrl, isUploading, pickAndUpload, removeImage } = useImageUpload();

  useEffect(() => {
    if (!wish) return;

    setTitle(wish.title);
    setNote(wish.note ?? '');
    setUrl(wish.url ?? '');
    setPrice(wish.price ?? '');
    setQuantity(normalizeQuantity(wish.quantity));
    setInitialImageUrl(wish.imageUrl);
    setImageRemoved(false);
  }, [wish]);

  const handleQuantityChange = (value: string) => {
    const num = Number(value);
    setQuantity(num > 0 ? String(num) : '1');
  };

  const handleRemoveImage = () => {
    removeImage();
    setImageRemoved(true);
  };

  const handleSave = async () => {
    if (!wishId || !wishlistId) return;

    const urlTrimmed = url.trim();
    if (urlTrimmed && !/^https?:\/\//i.test(urlTrimmed)) {
      Alert.alert('Помилка', 'Посилання має починатися з https://');
      return;
    }

    if (isUploading) {
      Alert.alert('Зачекай', 'Фото ще завантажується...');
      return;
    }

    const resolvedImageUrl = imageUrl ?? (imageRemoved ? null : imageUri ? null : initialImageUrl);

    try {
      await updateWish({
        id: wishId,
        wishlistId,
        ...buildCreateWishBody({ title, note, url, imageUrl: resolvedImageUrl, price, quantity }),
      }).unwrap();
      router.back();
    } catch (e: unknown) {
      Alert.alert('Помилка', getWishErrorMessage(e));
    }
  };

  const previewUri = imageUri ?? (imageRemoved ? null : initialImageUrl);
  const isBusy = isSaving || isUploading;

  if (isLoading || !wish) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={semanticColors.light.text.secondary} />
      </View>
    );
  }

  return (
    <FormInput
      value={title}
      onChangeText={setTitle}
      header="Редагувати бажання"
      headerDescription="Онови деталі, якщо щось змінилось"
      placeholder="Введи назву"
      saveButtonTitle={isBusy ? 'Збереження...' : 'Зберегти'}
      iconButton="checkmark"
      hideInfoMessage
      onSave={handleSave}
      bottomContent={
        <View style={styles.bottomContentContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.imageContainer}>
              {isUploading ? (
                <ActivityIndicator color={semanticColors.light.text.secondary} />
              ) : previewUri ? (
                <>
                  <Image source={{ uri: previewUri }} style={styles.imagePreview} resizeMode="cover" />
                  <View style={styles.removePhotoOverlay}>
                    <IconButton
                      icon="trash.fill"
                      variant="secondary"
                      size="sm"
                      sizeIcon={14}
                      onPress={handleRemoveImage}
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
                  onPress={() => setQuantity((prev) => String(Math.max(1, Number(prev) - 1)))}
                />
              }
              rightSlot={
                <IconButton
                  variant="secondary"
                  icon="plus"
                  size="sm"
                  sizeIcon={12}
                  onPress={() => setQuantity((prev) => String(Number(prev) + 1))}
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[4],
  },
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
