import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State, Task, DataTabs, FetchAdd } from './tasksType';

const initialState: State = {
  tasks: {
    current: null,
    inProgress: null,
    completed: null,
  },
  isLoading: true,
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

    // removeTask(state, action: PayloadAction<number[]>) {
    //   const tasksId = action.payload;
    //   let tasksTemp = state.tasks;

    //   tasksId.forEach((id) => {
    //     tasksTemp = tasksTemp?.filter((item) => item.id !== id) ?? null;
    //   });

    //   state.tasks = tasksTemp;
    // },

    // updateStatus(state, action: PayloadAction<any>) {
    //   const { status, tasksId } = action.payload;

    //   const tasksTemp = state.tasks ?? [];

    //   tasksId.forEach((id: number) => {
    //     if (Array.isArray(state.tasks)) {
    //       const index = state.tasks.findIndex((item) => item.id === id);

    //       if (state.tasks[index]) {
    //         tasksTemp[index].status = status;
    //       }
    //     }
    //   });

    //   state.tasks = tasksTemp;
    // },

    // editTask(state, action: PayloadAction<Task>) {
    //   const { id, text } = action.payload;
    //   if (text.trim()) {
    //     if (Array.isArray(state.tasks)) {
    //       const index = state.tasks.findIndex((item) => item.id === id);

    //       state.tasks[index].text = text;
    //     }
    //   }
    // },
    // fetchEditTask(state, action: PayloadAction<Task>) {
    //   //
    // },
    // fetchRemoveTask(state, action: PayloadAction<number[]>) {
    //   //
    // },
    fetchAddTask(state, action: PayloadAction<FetchAdd>) {
      //
    },
    // fetchUpdateStatus(state, action: PayloadAction<any>) {
    //   //
    // },
    fetchTasksData(state, action: PayloadAction<string>) {
      state.isLoading = true;
    },
  },
});

const tasksReducer = tasks.reducer;
const tasksActions = tasks.actions;

export { tasksActions, tasksReducer };
