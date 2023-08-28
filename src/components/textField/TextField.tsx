import { FC, memo } from 'react';

import { ChangeCustom } from '@components/index';
import Props from './textFieldType';

const TextField: FC<Props> = ({
  type,
  placeholder = '',
  autocomplete,
  name,
  value = '',
  ariaLabel = '',
  isError = false,
  message = '',
  onChangeCustom,
  // eslint-disable-next-line prettier/prettier
  onChange = () => {},
}) => {
  return (
    <div className="text-field">
      <ChangeCustom
        type="input"
        attributes={{
          type,
          placeholder,
          autoComplete: autocomplete,
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
