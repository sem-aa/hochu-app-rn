import { router } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

import { EmojiPickerButton, FormInput } from '@/shared/widgets';
import { useCreateWishlistMutation } from '@/entities/wishlist';

export function WishlistAddListModal() {
  const [title, setTitle] = useState('');
  const [emoji, setEmoji] = useState('✨');

  const [createWishlist, { isLoading }] = useCreateWishlistMutation();

  const handleSave = async () => {
    try {
      await createWishlist({ title: title.trim(), emoji }).unwrap();
      router.back();
    } catch {
      Alert.alert('Помилка', 'Не вдалося створити список. Спробуй ще раз.');
    }
  };

  return (
    <FormInput
      value={title}
      onChangeText={setTitle}
      header="Як назвемо список?"
      headerDescription="На день народження, свято чи просто так"
      placeholder="Введи назву"
      saveButtonTitle={isLoading ? 'Створення...' : 'Додати список'}
      iconButton="plus"
      onSave={handleSave}
      topContent={<EmojiPickerButton value={emoji} onChange={setEmoji} />}
    />
  );
}
