import Throttle from '@helpers/throttle/Throttle';
import { getToken, resetCode } from './generationToken/generationToken';
import { getDataToCookies, setDataToCookies, removeDataToCookies } from './cookies/cookies';
import { getProperty, setProperty } from './readWriteProperties/readWriteProperties';
import { Drag, Drop } from './dragAngDrop';

export {
  Throttle,
  getToken,
  resetCode,
  getDataToCookies,
  setDataToCookies,
  removeDataToCookies,
  getProperty,
  setProperty,
  Drag,
  Drop,
};
