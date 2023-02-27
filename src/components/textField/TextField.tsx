import { FC, memo, ChangeEvent } from 'react';

import { ChangeCustom } from '@components/index';

type Props = {
  type: 'text' | 'email' | 'password';
  placeholder?: string;
  name: string;
  value?: string;
  isError?: boolean;
  message?: string;
  ariaLabel: string;
  onChangeCustom?: (object: ChangeEvent<HTMLInputElement>) => void;
  onChange?: (object: ChangeEvent<HTMLInputElement>) => void;
};

const TextField: FC<Props> = ({
  type,
  placeholder = '',
  name,
  value = '',
  ariaLabel = '',
  isError = false,
  message = '',
  onChangeCustom,
  // eslint-disable-next-line prettier/prettier
  onChange = () => { },
}) => {
  return (
    <div className="text-field">
      <ChangeCustom
        type="input"
        attributes={{
          type,
          placeholder,
          name,
          className: `text-field__input${isError ? ' text-field__input_error' : ''}`,
          'aria-label': ariaLabel,
          onChange,
        }}
        value={value}
        onChangeCustom={onChangeCustom}
      />
      <dialog open={Boolean(message)} className="text-field__message-wrapper">
        <p className="text-field__message">{message}</p>
      </dialog>
    </div>
  );
};

export default memo(TextField);
