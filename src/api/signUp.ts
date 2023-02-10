import makeRequest from './makeRequest';

type Data = {
  name: string;
  password: string;
  tokenRegistration: string | null;
};

function registration(data: Data) {
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
