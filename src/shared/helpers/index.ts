import Throttle from '@helpers/throttle/Throttle';
import { getToken, resetCode } from './generationToken/generationToken';
import { getDataToCookies, setDataToCookies, removeDataToCookies } from './cookies/cookies';
import createProtectedRoutes from './createProtectedRoutes/createProtectedRoutes';

export {
  Throttle,
  getToken,
  resetCode,
  getDataToCookies,
  setDataToCookies,
  createProtectedRoutes,
  removeDataToCookies,
};
