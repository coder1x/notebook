import { ChangeEvent } from 'react';

type Props = {
  type: 'text' | 'email' | 'password';
  ariaLabel: string;
  name: string;
  placeholder?: string;
  value?: string;
  isError?: boolean;
  message?: string;
  onChangeCustom?: (object: ChangeEvent<HTMLInputElement>) => void;
  onChange?: (object: ChangeEvent<HTMLInputElement>) => void;
};

export default Props;
