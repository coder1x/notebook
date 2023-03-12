import { call, put, takeLeading } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { addTask, getTasks, removeTask, updateTaskStatus, updateTaskText } from '@api/index';
import { tasksActions, tasksType } from '@store/slices';
import { getDataToCookies } from '@helpers/index';
import { AddTask, Data, RemoveTask, Tasks, UpdateTask } from './tasksType';

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

    yield errorHandler(data);

    yield put(tasksActions.removeTask(tasksId));
  } catch (error) {
    console.log('error', error);
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
    console.log('error', error);
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
    console.log('error', error);
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

    yield put(
      tasksActions.addTask({
        id: Number(data.value) ?? 0,
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
  yield takeLeading(tasksActions.fetchUpdateStatus.type, fetchUpdateStatus);
}

function* sagaUpdateText() {
  yield takeLeading(tasksActions.fetchEditTask.type, fetchUpdateText);
}

export { sagaAddTask, sagaRemoveTask, sagaUpdateStatus, sagaUpdateText, sagaGetTasks };
