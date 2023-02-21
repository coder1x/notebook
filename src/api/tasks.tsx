import { makeRequest, getOptions } from '@api/makeRequest';

function getTasks(token: string, projectId: string) {
  return makeRequest(`tasks/getTasks.php?token=${token}&projectId=${projectId}`);
}

function addTask(data: any) {
  return makeRequest('tasks/add.php', getOptions(data));
}

function removeTask(data: any) {
  return makeRequest('tasks/remove.php', getOptions(data));
}

function updateStatus(data: any) {
  return makeRequest('tasks/updateStatus.php', getOptions(data));
}

export { addTask, removeTask, getTasks, updateStatus };
