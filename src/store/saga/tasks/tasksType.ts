import { tasksType } from '@store/slices';

type FetchData = {
  error: boolean;
  messageError: string;
  code: number;
};

interface Tasks extends FetchData {
  value?: tasksType.Task[];
}

interface AddTask extends FetchData {
  value?: number;
}

interface RemoveTask extends FetchData {
  value?: number;
}

interface UpdateTask extends FetchData {
  value?: number;
}

type Data = Tasks | AddTask | RemoveTask | UpdateTask;

export { FetchData, Tasks, AddTask, RemoveTask, UpdateTask, Data };
