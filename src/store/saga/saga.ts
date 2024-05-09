import { all } from 'redux-saga/effects';

import sagaRegistration from './signUp/signUp';
import sagaAuthorization from './signIn/signIn';
import sagaCheckUser from './nameValidator/nameValidator';
import sagaCheckCaptcha from './captcha/captcha';
import {
  sagaAddProject,
  sagaRemoveProject,
  sagaGetProjects,
  sagaUpdateProjectText,
  sagaGetNewPositionProjects,
} from './projects/projects';
import {
  sagaAddTask,
  sagaGetTasks,
  sagaRemoveTask,
  sagaUpdateStatus,
  sagaUpdateText,
  sagaGetNewPositionTasks,
} from './tasks/tasks';

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
    sagaGetNewPositionProjects(),
    sagaGetNewPositionTasks(),
  ]);
}

export default mySaga;
