import { useState } from 'react';

import { EmojiPickerButton, FormInput } from '@/components/widgets/';

export function WishlistAddListModal() {
  const [value, setValue] = useState('');
  const [emoji, setEmoji] = useState('✨');

  return (
    <FormInput
      value={value}
      onChangeText={setValue}
      header="Як назвемо список?"
      headerDescription="На день народження, свято чи просто так"
      placeholder="Введи назву"
      saveButtonTitle="Додати список"
      iconButton="plus"
      onSave={() => {
        console.log({ title: value, emoji });
      }}
      topContent={<EmojiPickerButton value={emoji} onChange={setEmoji} />}
    />
  );
}
