import { call, put, takeLeading } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { removeProject, addProject, getProjects } from '@api/index';
import { projectsActions } from '@store/slices';
import { getDataToCookies } from '@helpers/index';

type DataProject = {
  flag: boolean;
};

type Projects = [{}] | boolean;

function* fetchGetProjects() {
  try {
    const data: Projects = yield call(getProjects, getDataToCookies('TodoToken'));

    if (Array.isArray(data)) {
      yield put(projectsActions.setProjects(data));
    } else {
      // yield put();
      throw new Error('Не удалось получить данные о проектах.');
    }
  } catch (error) {
    console.log('Error', error);
  }
}

function* fetchRemoveProject(action: PayloadAction<number[]>) {
  const projectsId = action.payload;

  try {
    const data: DataProject = yield call(removeProject, {
      token: getDataToCookies('TodoToken'),
      projectsId,
    });

    if (data) {
      yield put(projectsActions.removeProject(projectsId));
    } else {
      throw new Error('Не удалось удалить проект.');
    }
  } catch (error) {
    console.log('error', error);
  }
}

function* fetchAddProject(action: PayloadAction<string>) {
  const text = action.payload;

  try {
    const data: boolean | number = yield call(addProject, {
      token: getDataToCookies('TodoToken'),
      text,
    });

    if (data) {
      yield put(
        projectsActions.addProject({
          id: Number(data),
          text,
        })
      );
    } else {
      throw new Error('Не удалось добавить запись.');
    }
  } catch (error) {
    console.log('error', error);
  }
}

function* sagaGetProjects() {
  yield takeLeading(projectsActions.fetchProjectsData.type, fetchGetProjects);
}

function* sagaAddProject() {
  yield takeLeading(projectsActions.fetchAddProject.type, fetchAddProject);
}

function* sagaRemoveProject() {
  yield takeLeading(projectsActions.fetchRemoveProject.type, fetchRemoveProject);
}

export { sagaAddProject, sagaRemoveProject, sagaGetProjects };
