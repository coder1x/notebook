import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import {
  signUpReducer,
  signInReducer,
  captchaReducer,
  nameValidatorReducer,
  projectsReducer,
  tasksReducer,
} from './slices';

import mySaga from './saga/saga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  signUp: signUpReducer,
  captcha: captchaReducer,
  nameValidator: nameValidatorReducer,
  signIn: signInReducer,
  projects: projectsReducer,
  tasks: tasksReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});
sagaMiddleware.run(mySaga);

type RootState = ReturnType<typeof store.getState>;

export { rootReducer };
export type { RootState };
export default store;
