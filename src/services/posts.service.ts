import IPost from '../interfaces/IPost';
import HttpClient from './httpClient';

class PostsService {
  static async readAll(): Promise<IPost[]> {
    const { data } = await HttpClient.api.get('/posts');

    return data;
  }

  static async readById(id: string): Promise<IPost> {
    const { data } = await HttpClient.api.get(`/posts/${id}`);

    return data;
  }

  static async readByUser(): Promise<IPost[]> {
    const { data } = await HttpClient.api.get(`/posts/me`);

    return data;
  }

  static async create(categoryId: string, title: string, content: string): Promise<{ user: Pick<IPost, 'author'> }> {
    const { data } = await HttpClient.api.post('/posts', { categoryId, title, content });
    return data;
  }
}

export default PostsService;
