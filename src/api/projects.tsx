import { makeRequest, getOptions } from '@api/makeRequest';

type AddingData = {
  token: string;
  text: string;
};

type RemovingData = {
  token: string;
  projectsId: number[];
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

export { addProject, removeProject, getProjects };
