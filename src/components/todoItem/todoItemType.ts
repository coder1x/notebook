type Action = (data: { id: number; text: string }) => void;

type Props = {
  type: 'project' | 'task';
  status: number;
  id: number;
  text: string;
  clickCheckbox: (id: number, isChecked: boolean) => void;
  onContextMenu?: Action;
  onClick?: Action;
  isChecked?: boolean;
};

export default Props;
