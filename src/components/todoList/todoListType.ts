type TodoData = {
  id: number;
  text: string;
  position: number;
};

type Action = (data: { id: number; text: string }) => void;

type Props = {
  type: 'project' | 'task';
  list: TodoData[];
  onCheckboxClick: (id: number, checked: boolean) => void;
  onChangePosition: (fromKey: string, toKey: string) => void;
  status?: number;
  onClick?: Action;
  onContextMenu?: Action;
  isChecked?: boolean;
};

export default Props;
