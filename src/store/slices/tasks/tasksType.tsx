type Task = {
  id: number;
  text: string;
  status: number;
};

type State = {
  tasks: Task[] | null;
  isLoading: boolean;
};

export { State, Task };
