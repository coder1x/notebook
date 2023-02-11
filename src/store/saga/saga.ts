import { all } from 'redux-saga/effects';

import sagaRegistration from './signUp';
import sagaAuthorization from './signIn';
import sagaCheckUser from './nameValidator';
import sagaCheckCaptcha from './captcha';
import { sagaAddProject, sagaRemoveProject, sagaGetProjects } from './projects';

function* mySaga() {
  yield all([
    sagaCheckUser(),
    sagaCheckCaptcha(),
    sagaRegistration(),
    sagaAuthorization(),
    sagaAddProject(),
    sagaRemoveProject(),
    sagaGetProjects(),
  ]);
}

export default mySaga;
