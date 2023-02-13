import { makeRequest } from './makeRequest';

function checkCaptcha(value: string, token: string) {
  return makeRequest(`captcha/checkCaptcha.php?code=${value}&token=${token}`);
}

export default checkCaptcha;
