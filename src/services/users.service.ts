import HttpClient from './httpClient';
import { IUser } from '../interfaces';

class UsersService {
  static async create(
    name: string,
    email: string,
    password: string
  ): Promise<{ user: Pick<IUser, 'id' | 'name' | 'email' | 'createdAt'> }> {
    const { data } = await HttpClient.api.post('/users', { name, email, password });
    return data;
  }
}

export default UsersService;
