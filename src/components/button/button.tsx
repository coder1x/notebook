import { createElement } from 'react';

const Button = (props: any) => {
  const { options } = props;
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
    props.text
  );
};

export default Button;
