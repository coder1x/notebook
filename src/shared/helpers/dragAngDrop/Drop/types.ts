import { ReactNode } from 'react';

export type DropCallback = (dragKey: string, dropKey: string) => void;

export type DropProps = {
  onDrop: DropCallback;
  onDragOver?: (dropKey: string) => void;
  children: ReactNode;
  dropKey: string;
  className?: string;
};

export type TouchDropEvent = Event & {
  detail?: {
    key?: string;
  };
};
