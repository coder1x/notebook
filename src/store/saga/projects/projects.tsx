import { call, put, takeLeading } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  removeProject,
  addProject,
  getProjects,
  updateProjectText,
  changePositionProject,
} from '@api/index';
import { projectsActions, projectsType } from '@store/slices';
import { getDataToCookies } from '@helpers/index';
import {
  AddProject,
  Data,
  Projects,
  RemoveProject,
  UpdateProjectText,
  ChangePosition,
} from './projectsType';

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

function* fetchGetNewPositionProjects(action: PayloadAction<ChangePosition>) {
  const { from, to } = action.payload;

  try {
    const data: Projects = yield call(changePositionProject, {
      token: getDataToCookies('TodoToken'),
      from,
      to,
    });

    yield errorHandler(data);

    yield put(projectsActions.changePositionProjects(data.value ?? []));
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
    console.log('Error', error);
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

    const { id, position } = data.value;

    yield put(
      projectsActions.addProject({
        id: Number(id) ?? 0,
        text,
        position: Number(position) ?? 0,
      })
    );
  } catch (error) {
    console.log('Error', error);
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
    console.log('Error', error);
  }
}

function* sagaGetProjects() {
  yield takeLeading(projectsActions.fetchProjectsData.type, fetchGetProjects);
}

function* sagaGetNewPositionProjects() {
  yield takeLeading(projectsActions.fetchProjectsPosition.type, fetchGetNewPositionProjects);
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

export {
  sagaAddProject,
  sagaRemoveProject,
  sagaGetProjects,
  sagaUpdateProjectText,
  sagaGetNewPositionProjects,
};
