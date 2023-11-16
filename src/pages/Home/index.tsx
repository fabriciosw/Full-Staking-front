import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import Aside from '../../components/Aside';
import Text from '../../components/Text';
import Section from '../../components/Section';
import PostsService from '../../services/posts.service';
import IPost from '../../interfaces/IPost';
import PostCard from '../../components/PostCard';
import toastMsg, { ToastType } from '../../utils/toastMsg';
import './styles.scss';
import { useLoader } from '../../contexts/LoaderContext';

const Home: React.FunctionComponent = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const { renderLoader } = useLoader();

  useEffect(() => {
    renderLoader('show');
    PostsService.readAll()
      .then((foundPosts) => {
        setPosts(foundPosts);
      })
      .catch(() => {
        toastMsg(ToastType.Error, 'Ocorreu algum problema ao carregar os posts');
      })
      .finally(() => {
        renderLoader('hide');
      });
  }, []);

  return (
    <Section className="p-0 d-flex" title="Página inicial" description="Página inicial">
      <Col md={12} className="home">
        <Aside />
        <div className="home__body">
          <Text as="h1" size="2.5rem" weight={700} color="#E0E5E9" className="mb-5 underline">
            Blob Blog | Posts
          </Text>
          <div className="postsGrid">
            {posts.map((post) => (
              <PostCard post={post} key={post.id} />
            ))}
          </div>
        </div>
      </Col>
    </Section>
  );
};

export default Home;
