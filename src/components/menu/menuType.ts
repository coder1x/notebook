import { Ref } from 'react';

type Props = {
  buttons: {
    name: string;
    handler: () => void;
  }[];
  ref: Ref<unknown> | undefined;
};

type Config = {
  isActive: boolean;
  type: 'desktop' | 'mobile';
};

export { Props, Config };
