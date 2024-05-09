import { tasksType } from '@store/slices';

type FetchData = {
  error: boolean;
  messageError: string;
  code: number;
};

interface Tasks extends FetchData {
  value?: {
    title: string;
    data: tasksType.Task[];
  };
}

interface AddTask extends FetchData {
  value: {
    id: number;
    position: number;
  };
}

interface RemoveTask extends FetchData {
  value?: number;
}

interface UpdateTask extends FetchData {
  value?: number;
}

type Data = Tasks | AddTask | RemoveTask | UpdateTask;

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

export { FetchData, Tasks, AddTask, RemoveTask, UpdateTask, Data, ChangePosition };
