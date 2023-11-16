import IPostCategory from './IPostCategory';
import { IUser } from './IUser';

export default interface IPost {
  id: string;
  createdAt: string;
  updatedAt: string;
  author: IUser;
  category: IPostCategory;
  title: string;
  content: string;
}

export interface ICreatePost extends Pick<IPost, 'title' | 'content'> {
  category: string;
}
