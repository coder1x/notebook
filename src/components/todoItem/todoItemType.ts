type Action = (data: { id: number; text: string }) => void;

type Props = {
  type: 'project' | 'task';
  status: number;
  id: number;
  position: number;
  text: string;
  clickCheckbox: (id: number, isChecked: boolean) => void;
  onChangePosition: (fromKey: string, toKey: string) => void;
  onContextMenu?: Action;
  onClick?: Action;
  isChecked?: boolean;
};

export default Props;
