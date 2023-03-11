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

type FetchUpdateText = {
  id: number;
  text: string;
};

type Tasks = {
  current: Task[] | null;
  inProgress: Task[] | null;
  completed: Task[] | null;
};

type State = {
  tasks: Tasks;
  errorCode: number;
  isLoading: boolean;
};

export { State, Task, Tasks, DataTabs, FetchAdd, FetchUpdateStatus, FetchUpdateText };
