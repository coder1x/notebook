import { EditorType } from '@components/index';

type EditorActions = {
  setConfig: (data: EditorType.Config) => void;
  config: EditorType.Config;
};

type ContextMenuActions = {
  setIsActive: (data: boolean) => void;
};

export { EditorActions, ContextMenuActions };
