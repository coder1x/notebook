import makeRequest from '@api/makeRequest';

function authorization(data: any) {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },

    body: JSON.stringify(data),
  };

  return makeRequest('authorization.php', options);
}

export default authorization;
