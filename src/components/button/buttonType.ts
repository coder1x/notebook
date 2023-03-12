type Modifier = 'submit' | 'interface' | 'contextMenu';

type Props = {
  text: string;
  tag?: string;
  href?: string;
  options?: {
    type?: string;
    disabled?: boolean;
    modifier?: Modifier;
    onClick?: Function;
  };
};

export { Modifier, Props };
