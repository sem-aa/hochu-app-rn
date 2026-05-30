import { IconButton } from '../buttons/icon-button';
import { BaseInput } from './base-input';

export type ClearInputProps = {
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
};

export const ClearInput = ({ value, placeholder, onChangeText }: ClearInputProps) => {
  const handleClear = () => {
    onChangeText('');
  };
  return (
    <BaseInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      rightSlot={
        value ? <IconButton variant={'secondary'} icon="xmark" onPress={handleClear} sizeIcon={12} /> : undefined
      }
    />
  );
};
