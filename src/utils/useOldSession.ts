import jwtDecode from 'jwt-decode';
import { IAuth } from '../contexts/AuthenticationContext';
import getTokenStorage from './getTokenStorage';

const useOldSession = (): IAuth => {
  const token = getTokenStorage();
  let auth = {} as IAuth;

  if (!token) return auth;

  const decoded: JWTPayload = jwtDecode(token);

  if (!(decoded.exp > Date.now().valueOf() / 1000 + 10 * 60)) return auth; // o token deve durar pelomenos 10 min

  auth = { isAuthenticated: true, permission: decoded.auth };

  return auth;
};

export default useOldSession;

interface JWTPayload {
  auth: 'none' | 'admin';
  exp: EpochTimeStamp;
  iat: EpochTimeStamp;
  sub: string;
}
