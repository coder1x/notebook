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

type UpdateStatusData = {
  token: string;
  tasksId: number[];
  status: number;
};

type UpdateTextData = {
  token: string;
  id: number;
  text: string;
};

type ChangePosition = {
  token: string;
  from: {
    id: number;
    position: number;
  };
  to: {
    id: number;
    position: number;
  };
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

function updateTaskStatus(data: UpdateStatusData) {
  return makeRequest('tasks/updateStatus.php', getOptions(data, 'PUT'));
}

function updateTaskText(data: UpdateTextData) {
  return makeRequest('tasks/updateText.php', getOptions(data, 'PATCH'));
}

function changePositionTask(data: ChangePosition) {
  return makeRequest('tasks/changePosition.php', getOptions(data, 'PUT'));
}

export { addTask, removeTask, getTasks, updateTaskStatus, updateTaskText, changePositionTask };
