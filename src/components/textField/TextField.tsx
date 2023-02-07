import { FC, memo } from 'react';

import { ChangeCustom } from '@components/index';

type Props = {
  type: 'text' | 'email' | 'password';
  placeholder?: string;
  name: string;
  value?: string;
  isError?: boolean;
  message?: string;
  ariaLabel: string;
  onChangeCustom?: Function;
  onChange?: Function;
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
  console.log('TextField');
  return (
    <div className="text-field">
      <ChangeCustom
        type="input"
        props={{
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
      {message && (
        <div className="text-field__message-wrapper">
          <p className="text-field__message">{message}</p>
        </div>
      )}
    </div>
  );
};

export default memo(TextField);
