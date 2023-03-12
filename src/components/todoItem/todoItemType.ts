type Props = {
  type: 'project' | 'task';
  status: number;
  id: number;
  text: string;
  clickCheckbox: Function;
  onContextMenu: Function;
  isChecked?: boolean;
};

export default Props;
