import makeRequest from './makeRequest';

function checkName(name: string) {
  return makeRequest(`checkName.php?name=${name}`);
}

function registration(data: any) {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  return makeRequest('registration.php', options);
}

export { checkName, registration };
