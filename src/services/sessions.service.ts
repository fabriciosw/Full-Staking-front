import jwtDecode from 'jwt-decode';
import getTokenStorage from '../utils/getTokenStorage';
import HttpClient from './httpClient';

interface JWTPayload {
  auth: 'none' | 'admin';
  exp: EpochTimeStamp;
  iat: EpochTimeStamp;
  sub: string;
}
export default class SessionsService {
  static async loginUser(email: string, password: string): Promise<JWTPayload> {
    const response = await HttpClient.api.post('/sessions', {
      email,
      password,
    });

    const { token } = response.data;

    const decoded: JWTPayload = jwtDecode(token);

    localStorage.setItem('TOKEN_KEY', token);
    HttpClient.api.defaults.headers.common.Authorization = getTokenStorage();

    return decoded;
  }

  static logoutUser(): void {
    localStorage.removeItem('TOKEN_KEY');
    HttpClient.api.defaults.headers.common.Authorization = '';
  }
}
