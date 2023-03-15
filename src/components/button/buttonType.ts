type Modifier = 'submit' | 'interface' | 'contextMenu';

type Props = {
  text: string;
  tag?: string;
  href?: string;
  options?: {
    type?: string;
    disabled?: boolean;
    modifier?: Modifier;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    tabIndex?: number;
  };
};

export { Modifier, Props };
