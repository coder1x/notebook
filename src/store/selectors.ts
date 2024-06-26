import { RootState } from '@store/store';

const messageState = (state: RootState) => state.signUp.message;
const isRegistrationErrorState = (state: RootState) => state.signUp.isRegistrationError;

const errorNameState = (state: RootState) => state.nameValidator.errorName;
const nameState = (state: RootState) => state.nameValidator.name;

const isErrorCaptchaState = (state: RootState) => state.captcha.isErrorCaptcha;

const tokenState = (state: RootState) => state.signIn.token;
const isAuthorizedState = (state: RootState) => state.signIn.isAuthorized;
const isSignInErrorState = (state: RootState) => state.signIn.isSignInError;

const projectsState = (state: RootState) => state.projects.projects;
const errorCodeProjectsState = (state: RootState) => state.projects.errorCode;
const isLoadingState = (state: RootState) => state.projects.isLoading;

const tasksState = (state: RootState) => state.tasks.tasks;
const projectTitleState = (state: RootState) => state.tasks.title;
const errorCodeTasksState = (state: RootState) => state.tasks.errorCode;
const isLoadingTasksState = (state: RootState) => state.tasks.isLoading;

export {
  messageState,
  isRegistrationErrorState,
  errorNameState,
  nameState,
  isErrorCaptchaState,
  tokenState,
  isSignInErrorState,
  projectsState,
  isLoadingState,
  tasksState,
  isLoadingTasksState,
  isAuthorizedState,
  errorCodeTasksState,
  errorCodeProjectsState,
  projectTitleState,
};
