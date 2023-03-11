import { all } from 'redux-saga/effects';

import sagaRegistration from './signUp';
import sagaAuthorization from './signIn';
import sagaCheckUser from './nameValidator';
import sagaCheckCaptcha from './captcha';
import {
  sagaAddProject,
  sagaRemoveProject,
  sagaGetProjects,
  sagaUpdateProjectText,
} from './projects';
import {
  sagaAddTask,
  sagaGetTasks,
  sagaRemoveTask,
  sagaUpdateStatus,
  sagaUpdateText,
} from './tasks';

function* mySaga() {
  yield all([
    sagaCheckUser(),
    sagaCheckCaptcha(),
    sagaRegistration(),
    sagaAuthorization(),
    sagaAddProject(),
    sagaRemoveProject(),
    sagaGetProjects(),
    sagaAddTask(),
    sagaGetTasks(),
    sagaRemoveTask(),
    sagaUpdateStatus(),
    sagaUpdateText(),
    sagaUpdateProjectText(),
  ]);
}

export default mySaga;
