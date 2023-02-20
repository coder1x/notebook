import { makeRequest, getOptions } from './makeRequest';

type Data = {
  name: string;
  password: string;
  tokenRegistration: string | null;
};

function registration(data: Data) {
  return makeRequest('registration.php', getOptions(data));
}

export default registration;
