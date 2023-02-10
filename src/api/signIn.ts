import makeRequest from '@api/makeRequest';
import { signInType } from '@store/slices';

function authorization(data: signInType.Data) {
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
