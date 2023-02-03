import { createElement } from 'react';

import './button.scss';

export default function Button(props: any) {
  const { options } = props;

  let selector = ''; // Style.button
  const type = options.modifier ?? 'interface';

  switch (type) {
    case 'submit':
      selector = ''; // Style.buttonSubmit
      break;
    case 'interface':
      selector = ''; // Style.buttonInterface
      break;
    default:
      break;
  }

  return createElement(
    'button',
    {
      ...options,
      className: `${'Style.button'} ${selector}`,
    },
    props.text
  );
}
