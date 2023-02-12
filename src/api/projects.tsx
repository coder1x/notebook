import makeRequest from '@api/makeRequest';

function getOptions(data: any) {
  return {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  };
}

function getProjects(token: string) {
  return makeRequest(`projects/getProjects.php?token=${token}`);
}

function addProject(data: any) {
  return makeRequest('projects/addProject.php', getOptions(data));
}

function removeProject(data: any) {
  return makeRequest('projects/removeProject.php', getOptions(data));
}

export { addProject, removeProject, getProjects };
