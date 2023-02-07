import makeRequest from './makeRequest';

function checkName(name: string) {
  return makeRequest(`checkName.php?name=${name}`);
}

export default checkName;
