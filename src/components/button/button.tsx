import { createElement, FC } from 'react';

type Props = {
  options: {
    type: string;
    disabled?: boolean;
    modifier?: 'submit' | 'interface';
    onClick: Function;
  };
  text: string;
};

const Button: FC<Props> = ({ options, text }) => {
  const optionsClone = { ...options };
  const type: 'submit' | 'interface' = optionsClone.modifier ?? 'interface';

  delete optionsClone.modifier;

  const modifier = {
    submit: ' button__submit',
    interface: ' button__interface',
  };

  return createElement(
    'button',
    {
      ...optionsClone,
      className: `${'button'}${modifier[type] ?? ''}`,
    },
    text
  );
};

export default Button;
