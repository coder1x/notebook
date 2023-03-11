import { createElement, FC, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

type Modifier = 'submit' | 'interface' | 'contextMenu';

type Props = {
  tag?: string;
  href?: string;
  options: {
    type?: string;
    disabled?: boolean;
    modifier?: Modifier;
    onClick?: Function;
  };
  text: string;
};

const Button: FC<Props> = ({ tag, href = '/', options, text }) => {
  const optionsClone = { ...options };
  const type: Modifier = optionsClone.modifier ?? 'interface';

  delete optionsClone.modifier;

  const modifier = {
    submit: ' button__submit',
    interface: ' button__interface',
    contextMenu: ' button__context-menu',
  };

  const className = `${'button'}${modifier[type] ?? ''}`;

  if (tag === 'Link') {
    const functionTemp = () => {
      //
    };

    const handleLinkClick = optionsClone.onClick ?? functionTemp;
    return (
      <Link className={className} onClick={handleLinkClick as MouseEventHandler} to={href}>
        {text}
      </Link>
    );
  }
  return createElement(
    'button',
    {
      ...optionsClone,
      className,
    },
    text
  );
};

export default Button;
