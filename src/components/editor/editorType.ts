import { Ref } from 'react';

type Props = {
  ref: Ref<unknown> | undefined;
  onAddData?: (data: string) => void;
  onUpdate?: (data: string) => void;
};

export default Props;
