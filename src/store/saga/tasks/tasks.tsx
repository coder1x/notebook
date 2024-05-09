import { call, put, takeLeading } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  addTask,
  getTasks,
  removeTask,
  updateTaskStatus,
  updateTaskText,
  changePositionTask,
} from '@api/index';
import { tasksActions, tasksType } from '@store/slices';
import { getDataToCookies } from '@helpers/index';
import { AddTask, Data, RemoveTask, Tasks, UpdateTask, ChangePosition } from './tasksType';

function* errorHandler(data: Data) {
  if (!data.error) {
    return false;
  }

  yield put(tasksActions.errorTask(data.code));
  throw new Error(data.messageError);
}

function* fetchGetTasks(action: PayloadAction<string>) {
  try {
    const data: Tasks = yield call(getTasks, getDataToCookies('TodoToken'), action.payload);

    yield errorHandler(data);

    if (!data.value) {
      throw new Error(data.messageError);
    }

    yield put(tasksActions.setTasks(data.value));
  } catch (error) {
    console.log('Error', error);
  }
}

function* fetchGetNewPositionTasks(action: PayloadAction<ChangePosition>) {
  const { from, to } = action.payload;

  try {
    const data: Tasks = yield call(changePositionTask, {
      token: getDataToCookies('TodoToken'),
      from,
      to,
    });

    yield errorHandler(data);

    if (!data.value) {
      throw new Error(data.messageError);
    }

    yield put(tasksActions.changePositionTasks(data.value));
  } catch (error) {
    console.log('Error', error);
  }
}

function* fetchRemoveTask(action: PayloadAction<number[]>) {
  const tasksId = action.payload;

  try {
    const data: RemoveTask = yield call(removeTask, {
      token: getDataToCookies('TodoToken'),
      tasksId,
    });

    yield errorHandler(data);

    yield put(tasksActions.removeTask(tasksId));
  } catch (error) {
    console.log('Error', error);
  }
}

function* fetchUpdateStatus(action: PayloadAction<tasksType.FetchUpdateStatus>) {
  const { status, tasksId } = action.payload;

  try {
    const data: UpdateTask = yield call(updateTaskStatus, {
      token: getDataToCookies('TodoToken'),
      tasksId,
      status,
    });

    yield errorHandler(data);

    yield put(tasksActions.updateStatus(action.payload));
  } catch (error) {
    console.log('Error', error);
  }
}

function* fetchUpdateText(action: PayloadAction<tasksType.FetchUpdateText>) {
  const { id, text } = action.payload;

  try {
    const data: UpdateTask = yield call(updateTaskText, {
      token: getDataToCookies('TodoToken'),
      id,
      text,
    });

    yield errorHandler(data);

    yield put(tasksActions.editTask(action.payload));
  } catch (error) {
    console.log('Error', error);
  }
}

function* fetchAddTask(action: PayloadAction<tasksType.FetchAdd>) {
  const { text, projectId } = action.payload;

  try {
    const data: AddTask = yield call(addTask, {
      token: getDataToCookies('TodoToken'),
      text,
      projectId,
    });

    yield errorHandler(data);

    const { id, position } = data.value;

    yield put(
      tasksActions.addTask({
        id: Number(id) ?? 0,
        text,
        status: 1,
        position: Number(position) ?? 0,
      })
    );
  } catch (error) {
    console.log('Error', error);
  }
}

function* sagaGetTasks() {
  yield takeLeading(tasksActions.fetchTasksData.type, fetchGetTasks);
}

function* sagaAddTask() {
  yield takeLeading(tasksActions.fetchAddTask.type, fetchAddTask);
}

function* sagaRemoveTask() {
  yield takeLeading(tasksActions.fetchRemoveTask.type, fetchRemoveTask);
}

function* sagaUpdateStatus() {
  yield takeLeading(tasksActions.fetchUpdateStatus.type, fetchUpdateStatus);
}

function* sagaUpdateText() {
  yield takeLeading(tasksActions.fetchEditTask.type, fetchUpdateText);
}

function* sagaGetNewPositionTasks() {
  yield takeLeading(tasksActions.fetchTasksPosition.type, fetchGetNewPositionTasks);
}

export {
  sagaAddTask,
  sagaRemoveTask,
  sagaUpdateStatus,
  sagaUpdateText,
  sagaGetTasks,
  sagaGetNewPositionTasks,
};
