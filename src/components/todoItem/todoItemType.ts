type Props = {
  type: 'project' | 'task';
  status: number;
  id: number;
  text: string;
  clickCheckbox: (id: number, isChecked: boolean) => void;
  onContextMenu: (data: { id: number; text: string }) => void;
  isChecked?: boolean;
};

export default Props;
