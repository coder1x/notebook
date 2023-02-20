import checkCaptcha from './captcha';
import registration from './signUp';
import checkName from './nameValidator';
import authorization from './signIn';
import { addProject, removeProject, getProjects } from './projects';
import { addTask, removeTask, getTasks, updateStatus } from './tasks';

export {
  checkCaptcha,
  checkName,
  registration,
  authorization,
  addProject,
  removeProject,
  getProjects,
  addTask,
  removeTask,
  getTasks,
  updateStatus,
};
