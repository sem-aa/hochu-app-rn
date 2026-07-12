import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { useGetWishlistQuery, useUpdateWishlistMutation } from '@/entities/wishlist';
import { FormInput } from '@/shared/widgets/forms';

type WishlistEditModalProps = {
  wishlistId: string;
};

export function WishlistEditModal({ wishlistId }: WishlistEditModalProps) {
  const { data: wishlist } = useGetWishlistQuery(wishlistId);
  const [updateWishlist, { isLoading }] = useUpdateWishlistMutation();
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (wishlist?.title) {
      setTitle(wishlist.title);
    }
  }, [wishlist?.title]);

  const handleSave = async () => {
    try {
      await updateWishlist({ id: wishlistId, title: title.trim() }).unwrap();
      router.back();
    } catch {
      Alert.alert('Помилка', 'Не вдалося зберегти назву. Спробуй ще раз.');
    }
  };

  return (
    <FormInput
      value={title}
      onChangeText={setTitle}
      placeholder="Назва списку"
      header="Назва вішліста"
      headerDescription="Імʼя списку, яке побачать ті, з ким ви поділитесь вішлістом"
      saveButtonTitle={isLoading ? 'Збереження...' : 'Зберегти'}
      iconButton="checkmark"
      onSave={handleSave}
    />
  );
}
