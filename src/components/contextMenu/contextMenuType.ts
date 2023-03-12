import { Ref } from 'react';

type Props = {
  buttons: {
    name: string;
    handler: () => void;
  }[];
  ref: Ref<unknown> | undefined;
};

export default Props;
