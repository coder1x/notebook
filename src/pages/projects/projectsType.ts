import { EditorType } from '@components/index';

type ContextMenuActions = {
  setIsActive: (data: boolean) => void;
};

type EditorActions = {
  setConfig: (data: EditorType.Config) => void;
  config: EditorType.Config;
};

export { ContextMenuActions, EditorActions };
