import makeRequest from './makeRequest';

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

export default registration;
