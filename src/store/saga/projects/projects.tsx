import { call, put, takeLeading } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { removeProject, addProject, getProjects, updateProjectText } from '@api/index';
import { projectsActions, projectsType } from '@store/slices';
import { getDataToCookies } from '@helpers/index';
import { AddProject, Data, Projects, RemoveProject, UpdateProjectText } from './projectsType';

function* errorHandler(data: Data) {
  if (!data.error) {
    return false;
  }

  yield put(projectsActions.errorProject(data.code));
  throw new Error(data.messageError);
}

function* fetchGetProjects() {
  try {
    const data: Projects = yield call(getProjects, getDataToCookies('TodoToken'));

    yield errorHandler(data);

    yield put(projectsActions.setProjects(data.value ?? []));
  } catch (error) {
    console.log('Error', error);
  }
}

function* fetchRemoveProject(action: PayloadAction<number[]>) {
  const projectsId = action.payload;

  try {
    const data: RemoveProject = yield call(removeProject, {
      token: getDataToCookies('TodoToken'),
      projectsId,
    });

    yield errorHandler(data);

    if (data.value) {
      yield put(projectsActions.removeProject(projectsId));
    }
  } catch (error) {
    console.log('error', error);
  }
}

function* fetchAddProject(action: PayloadAction<string>) {
  const text = action.payload;

  try {
    const data: AddProject = yield call(addProject, {
      token: getDataToCookies('TodoToken'),
      text,
    });

    yield errorHandler(data);

    yield put(
      projectsActions.addProject({
        id: Number(data.value),
        text,
      })
    );
  } catch (error) {
    console.log('error', error);
  }
}

function* fetchUpdateText(action: PayloadAction<projectsType.Project>) {
  const { id, text } = action.payload;

  try {
    const data: UpdateProjectText = yield call(updateProjectText, {
      token: getDataToCookies('TodoToken'),
      id,
      text,
    });

    yield errorHandler(data);

    yield put(projectsActions.editProject(action.payload));
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

function* sagaUpdateProjectText() {
  yield takeLeading(projectsActions.fetchEditProject.type, fetchUpdateText);
}

export { sagaAddProject, sagaRemoveProject, sagaGetProjects, sagaUpdateProjectText };
