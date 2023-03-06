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

type FetchAdd = {
  text: string;
  projectId: string;
};

type FetchUpdateStatus = {
  tasksId: number[];
  status: number;
};

type State = {
  tasks: {
    current: Task[] | null;
    inProgress: Task[] | null;
    completed: Task[] | null;
  };
  errorCode: number;
  isLoading: boolean;
};

export { State, Task, DataTabs, FetchAdd, FetchUpdateStatus };
