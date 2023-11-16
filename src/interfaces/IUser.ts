export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  permission: 'admin' | 'none';
  createdAt: Date;
  updatedAt: Date;
}
