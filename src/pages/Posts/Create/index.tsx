import React, { useEffect, useMemo, useState } from 'react';
import { Col } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router';
import Aside from '../../../components/Aside';
import Text from '../../../components/Text';
import Select from '../../../components/Select';
import Section from '../../../components/Section';
import Input from '../../../components/Input';
import toastMsg, { ToastType } from '../../../utils/toastMsg';
import { useLoader } from '../../../contexts/LoaderContext';
import { ICreatePost } from '../../../interfaces/IPost';
import PostsService from '../../../services/posts.service';
import IPostCategory from '../../../interfaces/IPostCategory';
import PostCategoriesService from '../../../services/postCategories.service';
import './styles.scss';

const CreatePost: React.FunctionComponent = () => {
  const [post, setPost] = useState<ICreatePost>({ category: '', content: '', title: '' } as ICreatePost);
  const [postCategories, setPostCategories] = useState<IPostCategory[]>([]);
  const { renderLoader } = useLoader();
  const history = useHistory();

  useEffect(() => {
    renderLoader('show');
    PostCategoriesService.readAll().then((response) => {
      setPostCategories(response);
      renderLoader('hide');
    });
  }, []);

  const selectOptions = useMemo(
    () =>
      postCategories?.map((option) => {
        const optionObj = { value: option.id, name: option.name };
        return optionObj;
      }),
    [postCategories]
  );

  const handleSubmit = async (event: React.FormEvent, values: ICreatePost): Promise<void> => {
    event.preventDefault();
    const { category, title, content } = values;
    if (!category) {
      toastMsg(ToastType.Warning, 'Selecione uma categoria');
      return;
    }
    renderLoader('show');

    await PostsService.create(category, title, content)
      .then(() => {
        toastMsg(ToastType.Success, 'Post criado!');
        history.push('/meus-posts');
      })
      .catch(() => {
        toastMsg(ToastType.Error, 'Ocorreu algum problema');
      })
      .finally(() => {
        renderLoader('hide');
      });
  };

  return (
    <Section className="p-0 d-flex" title="Criar post" description="Crie seu post">
      <Col md={12} className="postContainer">
        <Aside />
        <div className="postContainer__body">
          <div className="post">
            <Text as="h1" size="3.5rem" weight={700} color="#E0E5E9" className="mb-2">
              Criar post
            </Text>
            <form onSubmit={(e) => handleSubmit(e, post)} autoComplete="off">
              <Text as="h3" size="1.25rem" weight={400} color="#E0E5E9" className="mb-2 mt-4">
                Título
              </Text>
              <Input
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                fullWidth
                required
                sx={{ marginBottom: 3 }}
              />
              <Text as="h3" size="1.25rem" weight={400} color="#E0E5E9" className="mb-2">
                Categoria
              </Text>
              <Select
                value={post.category}
                onChange={(e, newValue) => {
                  setPost({ ...post, category: newValue as string });
                }}
                selectOptions={selectOptions}
              />
              <Text as="h3" size="1.25rem" weight={500} color="#E0E5E9" className="mb-2 mt-4">
                Conteúdo
              </Text>
              <Input
                value={post.content}
                onChange={(e) => setPost({ ...post, content: e.target.value })}
                fullWidth
                required
                multiline
              />
              <Button type="submit" variant="contained" fullWidth className="mt-5 login__box__submitBtn">
                Postar
              </Button>
            </form>
          </div>
        </div>
      </Col>
    </Section>
  );
};

export default CreatePost;
