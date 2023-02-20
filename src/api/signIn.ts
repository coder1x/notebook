import { makeRequest, getOptions } from '@api/makeRequest';
import { signInType } from '@store/slices';

function authorization(data: signInType.Data) {
  return makeRequest('authorization.php', getOptions(data));
}

export default authorization;
