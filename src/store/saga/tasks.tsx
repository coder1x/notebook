import { call, put, takeLeading } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { addTask, getTasks, removeTask, updateStatus } from '@api/index';
import { tasksActions, tasksType } from '@store/slices';
import { getDataToCookies } from '@helpers/index';

type FetchData = {
  error: boolean;
  messageError: string;
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

function* fetchGetTasks() {
  try {
    const data: Tasks = yield call(getTasks, getDataToCookies('TodoToken'));

    if (data.error) {
      throw new Error(data.messageError);
    }

    yield put(tasksActions.setTasks(data.value ?? []));
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

    if (data.error) {
      throw new Error(data.messageError);
    }

    yield put(tasksActions.removeTask(tasksId));
  } catch (error) {
    console.log('error', error);
  }
}

function* fetchUpdateTask(action: PayloadAction<any>) {
  const { status, tasksId } = action.payload;

  try {
    const data: UpdateTask = yield call(updateStatus, {
      token: getDataToCookies('TodoToken'),
      tasksId,
      status,
    });

    if (data.error) {
      throw new Error(data.messageError);
    }

    yield put(tasksActions.updateStatus(action.payload));
  } catch (error) {
    console.log('error', error);
  }
}

function* fetchAddTask(action: PayloadAction<any>) {
  const { text, projectId } = action.payload;

  try {
    const data: AddTask = yield call(addTask, {
      token: getDataToCookies('TodoToken'),
      text,
      projectId,
    });

    if (data.error) {
      throw new Error(data.messageError);
    }

    yield put(
      tasksActions.addTask({
        id: data.value ?? 0,
        text,
        status: 1,
      })
    );
  } catch (error) {
    console.log('error', error);
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
  yield takeLeading(tasksActions.fetchUpdateStatus.type, fetchUpdateTask);
}

export { sagaAddTask, sagaRemoveTask, sagaUpdateStatus, sagaGetTasks };
