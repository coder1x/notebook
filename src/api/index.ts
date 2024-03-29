import checkCaptcha from './captcha';
import registration from './signUp';
import checkName from './nameValidator';
import authorization from './signIn';
import { addProject, removeProject, getProjects, updateProjectText } from './projects';
import { addTask, removeTask, getTasks, updateTaskStatus, updateTaskText } from './tasks';

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
  updateTaskStatus,
  updateTaskText,
  updateProjectText,
};
