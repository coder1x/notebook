import { makeRequest, getOptions } from '@api/makeRequest';

type AddingData = {
  token: string;
  text: string;
};

type RemovingData = {
  token: string;
  projectsId: number[];
};

type UpdateTextData = {
  token: string;
  id: number;
  text: string;
};

function getProjects(token: string) {
  return makeRequest(`projects/getProjects.php?token=${token}`);
}

function addProject(data: AddingData) {
  return makeRequest('projects/add.php', getOptions(data));
}

function removeProject(data: RemovingData) {
  return makeRequest('projects/remove.php', getOptions(data, 'DELETE'));
}

function updateProjectText(data: UpdateTextData) {
  return makeRequest('projects/updateText.php', getOptions(data, 'PATCH'));
}

export { addProject, removeProject, getProjects, updateProjectText };
