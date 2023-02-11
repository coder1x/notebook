import { call, put, takeLeading } from 'redux-saga/effects';
import { getProjectId, removeProject, addProject, getProjects } from '@api/index';
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

function* fetchRemoveProject(action: any) {
  const { projectsId } = action;

  try {
    const data: DataProject = yield call(removeProject, {
      token: 'action.token',
      projectsId,
    });

    if (data) {
      // yield put({
      //   type: 'REMOVE_PROJECT_STORE',
      //   projectsId: action.projectsId,
      // });
    } else {
      throw new Error('Не удалось удалить проект.');
    }
  } catch (error) {
    console.log('error', error);
  }
}

function* fetchAddProject(action: any) {
  const { text } = action;

  try {
    const data: DataProject = yield call(addProject, {
      token: 'action.token',
      text,
    });

    if (data) {
      type MAX_ID = string | boolean;

      // за место того что бы делать такой запрос я думаю это нужно на стороне Бека делать и пусть он в ответе
      // возвращает нам id и запись которую мы добавили.
      const maxId: MAX_ID = yield call(getProjectId);

      const id = parseInt(String(maxId), 10);
      let newId = 1;

      if (!isNaN(id)) {
        newId = id;
      }

      // yield put({
      //   type: 'ADD_PROJECT_STORE',
      //   id: newId,
      //   text: action.text,
      // });

      // yield put({
      //   type: 'CLEAR_TEXT',
      // });
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
  yield takeLeading(projectsActions.removeProject.type, fetchRemoveProject);
}

export { sagaAddProject, sagaRemoveProject, sagaGetProjects };
