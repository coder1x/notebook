import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { signUpReducer, captchaReducer } from './slices';

import mySaga from './saga/saga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  signUp: signUpReducer,
  captcha: captchaReducer,
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
