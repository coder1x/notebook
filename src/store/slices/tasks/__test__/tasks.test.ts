import store from '@store/store';
import { tasksActions } from '@store/slices';

describe('Tasks slice', () => {
  it('should return the initial state', () => {
    expect(store.getState().tasks).toEqual({
      tasks: {
        current: null,
        inProgress: null,
        completed: null,
      },
      isLoading: true,
      errorCode: 0,
    });
  });

  it('action setTasks', () => {
    const tasksData = [
      {
        id: 1,
        text: 'задача 1',
        status: 1,
      },
      {
        id: 2,
        text: 'задача 2',
        status: 1,
      },
      {
        id: 3,
        text: 'задача 3',
        status: 2,
      },
      {
        id: 4,
        text: 'задача 4',
        status: 3,
      },
    ];

    store.dispatch(tasksActions.setTasks(tasksData));

    expect(store.getState().tasks).toEqual({
      tasks: {
        current: [
          {
            id: 1,
            text: 'задача 1',
            status: 1,
          },
          {
            id: 2,
            text: 'задача 2',
            status: 1,
          },
        ],
        inProgress: [
          {
            id: 3,
            text: 'задача 3',
            status: 2,
          },
        ],
        completed: [
          {
            id: 4,
            text: 'задача 4',
            status: 3,
          },
        ],
      },
      isLoading: false,
      errorCode: 0,
    });
  });

  it('action clearState', () => {
    store.dispatch(tasksActions.clearState());

    expect(store.getState().tasks).toEqual({
      tasks: {
        current: null,
        inProgress: null,
        completed: null,
      },
      isLoading: false,
      errorCode: 0,
    });
  });

  it('action addTask', () => {
    const taskData = {
      id: 1,
      text: 'задача 1',
      status: 1,
    };

    store.dispatch(tasksActions.addTask(taskData));

    expect(store.getState().tasks.tasks).toEqual({
      current: [taskData],
      inProgress: null,
      completed: null,
    });
  });

  it('action removeTask', () => {
    for (let i = 2; i <= 4; i += 1) {
      store.dispatch(
        tasksActions.addTask({
          id: i,
          text: `задача ${i}`,
          status: 1,
        })
      );
    }

    store.dispatch(tasksActions.removeTask([1, 3]));

    expect(store.getState().tasks.tasks).toEqual({
      current: [
        { id: 2, text: 'задача 2', status: 1 },
        { id: 4, text: 'задача 4', status: 1 },
      ],
      inProgress: null,
      completed: null,
    });
  });

  it('action updateStatus', () => {
    store.dispatch(
      tasksActions.updateStatus({
        tasksId: [2, 4],
        status: 3,
      })
    );

    expect(store.getState().tasks.tasks).toEqual({
      current: [],
      inProgress: null,
      completed: [
        { id: 2, text: 'задача 2', status: 3 },
        { id: 4, text: 'задача 4', status: 3 },
      ],
    });
  });

  it('action editTask', () => {
    store.dispatch(
      tasksActions.editTask({
        id: 4,
        text: 'задача 4 ****',
      })
    );

    expect(store.getState().tasks.tasks).toEqual({
      current: [],
      inProgress: null,
      completed: [
        { id: 2, text: 'задача 2', status: 3 },
        { id: 4, text: 'задача 4 ****', status: 3 },
      ],
    });
  });

  it('action fetchTasksData', () => {
    store.dispatch(tasksActions.fetchTasksData('задача 6'));

    expect(store.getState().tasks.isLoading).toEqual(true);
  });

  it('action errorTask', () => {
    store.dispatch(tasksActions.errorTask(123));

    expect(store.getState().tasks.errorCode).toEqual(123);
  });
});
