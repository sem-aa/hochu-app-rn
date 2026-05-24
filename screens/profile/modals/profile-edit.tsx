import { useState } from 'react';

import { FormInput } from '@/components/widgets';

export function ProfileEditModal() {
  const [value, setValue] = useState('');

  return (
    <FormInput
      value={value}
      onChangeText={setValue}
      placeholder="Імʼя"
      header="Ваше імʼя"
      headerDescription="Імʼя вашого профілю, яке побачать ті, з ким ви поділитесь вішлістом"
      saveButtonTitle="Зберегти"
      iconButton="checkmark"
      onSave={() => {
        console.log('save');
      }}
    />
  );
}
