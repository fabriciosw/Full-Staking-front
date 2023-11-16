import IPostCategory from '../interfaces/IPostCategory';
import HttpClient from './httpClient';

class PostCategoriesService {
  static async readAll(): Promise<IPostCategory[]> {
    const { data } = await HttpClient.api.get('/postCategories');

    return data;
  }

  static async create(
    name: string
  ): Promise<{ message: string; user: Pick<IPostCategory, 'id' | 'name' | 'createdAt'> }> {
    const { data } = await HttpClient.api.post('/postCategories', { name });

    return data;
  }
}

export default PostCategoriesService;
