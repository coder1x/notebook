import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProperty, setProperty } from '@helpers/index';
import {
  State,
  Task,
  Tasks,
  DataTabs,
  FetchAdd,
  FetchUpdateStatus,
  FetchUpdateText,
} from './tasksType';

const getIndex = (data: Task[] | null, id: number) => {
  const index = data?.findIndex((item) => item.id === id) ?? null;

  if (index === -1) {
    return null;
  }

  return index;
};

const initialState: State = {
  tasks: {
    current: null,
    inProgress: null,
    completed: null,
  },
  isLoading: true,
  errorCode: 0,
};

const tasks = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      const tasksTemp: DataTabs = {
        current: [],
        inProgress: [],
        completed: [],
      };

      action.payload.forEach((item) => {
        switch (item.status) {
          case 1:
            tasksTemp.current.push(item);
            break;
          case 2:
            tasksTemp.inProgress.push(item);
            break;
          case 3:
            tasksTemp.completed.push(item);
            break;
          default:
            break;
        }
      });

      state.tasks = tasksTemp;
      state.isLoading = false;
    },

    clearState(state) {
      state.tasks = {
        current: null,
        inProgress: null,
        completed: null,
      };
      state.errorCode = 0;
    },

    addTask(state, action: PayloadAction<Task>) {
      const { id, text, status } = action.payload;

      if (Array.isArray(state.tasks.current)) {
        state.tasks.current.push({
          id,
          text,
          status,
        });
      } else {
        state.tasks.current = [
          {
            id,
            text,
            status,
          },
        ];
      }
    },

    removeTask(state, action: PayloadAction<number[]>) {
      const tasksId = action.payload;
      const tasksTemp = state.tasks;

      const remove = (data: Task[] | null, id: number) => {
        const items = data?.filter((item) => item.id !== id) ?? null;

        return {
          items,
          isEqual: items?.length === data?.length,
        };
      };

      for (const id of tasksId) {
        const keys = Object.keys(tasksTemp);

        for (const key of keys) {
          let item = getProperty(tasksTemp, key as keyof Tasks);
          const list = remove(item, id);

          if (!list.isEqual && Array.isArray(list.items)) {
            item = list.items;
            setProperty(tasksTemp, key as keyof Tasks, item);
            break;
          }
        }
      }

      state.tasks = tasksTemp;
    },

    updateStatus(state, action: PayloadAction<FetchUpdateStatus>) {
      const { status, tasksId } = action.payload;

      const tasksTemp = state.tasks;

      const addTask = (item: Task) => {
        switch (status) {
          case 1:
            if (Array.isArray(tasksTemp.current)) {
              tasksTemp.current.push(item);
            } else {
              tasksTemp.current = [item];
            }
            break;
          case 2:
            if (Array.isArray(tasksTemp.inProgress)) {
              tasksTemp.inProgress.push(item);
            } else {
              tasksTemp.inProgress = [item];
            }
            break;
          case 3:
            if (Array.isArray(tasksTemp.completed)) {
              tasksTemp.completed.push(item);
            } else {
              tasksTemp.completed = [item];
            }
            break;
          default:
            break;
        }
      };

      for (const id of tasksId) {
        const keys = Object.keys(tasksTemp);

        for (const key of keys) {
          const item = getProperty(tasksTemp, key as keyof Tasks);
          const index = getIndex(item, id);

          if (index !== null && Array.isArray(item)) {
            item[index].status = status;

            addTask(item[index]);

            item.splice(index, 1);

            setProperty(tasksTemp, key as keyof Tasks, item);
            break;
          }
        }
      }

      state.tasks = tasksTemp;
    },

    editTask(state, action: PayloadAction<FetchUpdateText>) {
      const { id, text } = action.payload;

      const tasksTemp = state.tasks;

      if (text.trim()) {
        const keys = Object.keys(tasksTemp);

        for (const key of keys) {
          const item = getProperty(tasksTemp, key as keyof Tasks);
          const index = getIndex(item, id);

          if (index !== null && Array.isArray(item)) {
            item[index].text = text;

            setProperty(tasksTemp, key as keyof Tasks, item);
            break;
          }
        }
      }

      state.tasks = tasksTemp;
    },
    errorTask(state, action: PayloadAction<number>) {
      state.errorCode = action.payload;
    },
    fetchEditTask(state, action: PayloadAction<FetchUpdateText>) {
      //
    },
    fetchRemoveTask(state, action: PayloadAction<number[]>) {
      //
    },
    fetchAddTask(state, action: PayloadAction<FetchAdd>) {
      //
    },
    fetchUpdateStatus(state, action: PayloadAction<FetchUpdateStatus>) {
      //
    },
    fetchTasksData(state, action: PayloadAction<string>) {
      state.isLoading = true;
    },
  },
});

const tasksReducer = tasks.reducer;
const tasksActions = tasks.actions;

export { tasksActions, tasksReducer };
