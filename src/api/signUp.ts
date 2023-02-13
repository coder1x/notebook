import { makeRequest, getOptionsPost } from './makeRequest';

type Data = {
  name: string;
  password: string;
  tokenRegistration: string | null;
};

function registration(data: Data) {
  return makeRequest('registration.php', getOptionsPost(data));
}

export default registration;
