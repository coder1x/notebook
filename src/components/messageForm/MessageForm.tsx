import { FC } from 'react';

import Props from './messageFormType';

const MessageForm: FC<Props> = ({ isError, text }) => {
  const messageWrapperModifier = isError ? ' message-form_error' : '';

  return (
    <div className={`message-form${messageWrapperModifier}`}>
      <p className="message-form__text">{text}</p>
    </div>
  );
};

export default MessageForm;
