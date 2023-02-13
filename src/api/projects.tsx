import { makeRequest, getOptionsPost } from '@api/makeRequest';

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
  return makeRequest('projects/addProject.php', getOptionsPost(data));
}

function removeProject(data: RemovingData) {
  return makeRequest('projects/removeProject.php', getOptionsPost(data));
}

export { addProject, removeProject, getProjects };
