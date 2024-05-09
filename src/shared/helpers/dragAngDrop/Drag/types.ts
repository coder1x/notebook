import { ReactNode } from 'react';

export type DragProps = {
  data: {
    key: string;
    image?: string;
  };
  children: ReactNode;
  className?: string;
};
