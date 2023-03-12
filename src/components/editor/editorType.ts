import { Ref } from 'react';

type Config = {
  title: string;
  text: string;
  isActive: boolean;
  type: 'addData' | 'editData' | 'viewData';
};

type Props = {
  ref: Ref<unknown> | undefined;
  onAddData?: (data: string) => void;
  onUpdate?: (data: string) => void;
};

export { Props, Config };
