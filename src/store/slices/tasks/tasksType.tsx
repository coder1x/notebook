type Task = {
  id: number;
  text: string;
  status: number;
  position: number;
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
  title: string;
};

type ChangePosition = {
  from: {
    id: number;
    position: number;
  };
  to: {
    id: number;
    position: number;
  };
};

export {
  State,
  Task,
  Tasks,
  DataTabs,
  FetchAdd,
  FetchUpdateStatus,
  FetchUpdateText,
  ChangePosition,
};
