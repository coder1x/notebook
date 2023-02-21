type Task = {
  id: number;
  text: string;
  status: number;
};

type DataTabs = {
  current: Task[];
  inProgress: Task[];
  completed: Task[];
};

type State = {
  tasks: {
    current: Task[] | null;
    inProgress: Task[] | null;
    completed: Task[] | null;
  };
  isLoading: boolean;
};

export { State, Task, DataTabs };
