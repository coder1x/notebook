type TodoData = {
  id: number;
  text: string;
};

type Action = (data: { id: number; text: string }) => void;

type Props = {
  type: 'project' | 'task';
  list: TodoData[];
  onCheckboxClick: (id: number, checked: boolean) => void;
  status?: number;
  onClick?: Action;
  onContextMenu?: Action;
  isChecked?: boolean;
};

export default Props;
