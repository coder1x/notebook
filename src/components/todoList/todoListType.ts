type TodoData = {
  id: number;
  text: string;
};

type Props = {
  type: 'project' | 'task';
  list: TodoData[];
  onCheckboxClick: (id: number, checked: boolean) => void;
  status?: number;
  onClick?: (data: string) => void;
  onContextMenu?: (item: { id: number; text: string }) => void;
  isChecked?: boolean;
};

export default Props;
