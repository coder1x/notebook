import { Ref } from 'react';

type Props = {
  onStatus: (data: boolean) => void;
  ref: Ref<unknown> | undefined;
};

export default Props;
