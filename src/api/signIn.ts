import { makeRequest, getOptionsPost } from '@api/makeRequest';
import { signInType } from '@store/slices';

function authorization(data: signInType.Data) {
  return makeRequest('authorization.php', getOptionsPost(data));
}

export default authorization;
