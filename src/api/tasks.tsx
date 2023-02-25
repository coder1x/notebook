import { makeRequest, getOptions } from '@api/makeRequest';

type AddingData = {
  token: string;
  text: string;
  projectId: string;
};

type RemovingData = {
  token: string;
  tasksId: number[];
};

type UpdateData = {
  token: string;
  tasksId: number[];
  status: number;
};

function getTasks(token: string, projectId: string) {
  return makeRequest(`tasks/getTasks.php?token=${token}&projectId=${projectId}`);
}

function addTask(data: AddingData) {
  return makeRequest('tasks/add.php', getOptions(data));
}

function removeTask(data: RemovingData) {
  return makeRequest('tasks/remove.php', getOptions(data, 'DELETE'));
}

function updateStatus(data: UpdateData) {
  return makeRequest('tasks/updateStatus.php', getOptions(data));
}

export { addTask, removeTask, getTasks, updateStatus };
