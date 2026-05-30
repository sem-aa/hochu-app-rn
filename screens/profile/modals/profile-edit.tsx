import { router } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

import { FormInput } from '@/components/widgets';
import { useGetMeQuery, useUpdateMeMutation } from '@/features/user';

export function ProfileEditModal() {
  const { data: user } = useGetMeQuery();
  const [updateMe, { isLoading }] = useUpdateMeMutation();
  const [name, setName] = useState(user?.name ?? '');

  const handleSave = async () => {
    try {
      await updateMe({ name: name.trim() }).unwrap();
      router.back();
    } catch {
      Alert.alert('Помилка', 'Не вдалося зберегти імʼя. Спробуй ще раз.');
    }
  };

  return (
    <FormInput
      value={name}
      onChangeText={setName}
      placeholder="Імʼя"
      header="Ваше імʼя"
      headerDescription="Імʼя вашого профілю, яке побачать ті, з ким ви поділитесь вішлістом"
      saveButtonTitle={isLoading ? 'Збереження...' : 'Зберегти'}
      iconButton="checkmark"
      onSave={handleSave}
    />
  );
}
