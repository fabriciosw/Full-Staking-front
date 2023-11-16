import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { useParams } from 'react-router';
import Aside from '../../../components/Aside';
import Text from '../../../components/Text';
import Section from '../../../components/Section';
import PostsService from '../../../services/posts.service';
import IPost from '../../../interfaces/IPost';
import formatDate from '../../../utils/formatDate';
import { useLoader } from '../../../contexts/LoaderContext';
import toastMsg, { ToastType } from '../../../utils/toastMsg';
import './styles.scss';

const SeeOnePost: React.FunctionComponent = () => {
  const [post, setPost] = useState<IPost>({} as IPost);
  const { renderLoader } = useLoader();

  const { postId } = useParams<{ postId: string }>();

  useEffect(() => {
    renderLoader('show');
    PostsService.readById(postId)
      .then((foundPost) => {
        setPost(foundPost);
      })
      .catch(() => {
        toastMsg(ToastType.Error, 'Ocorreu algum problema ao carregar o post');
      })
      .finally(() => {
        renderLoader('hide');
      });
  }, [postId]);

  return (
    <Section className="p-0 d-flex" title={post.title}>
      <Col md={12} className="postContainer">
        <Aside />
        <div className="postContainer__body">
          <div className="post">
            <Text as="h1" size="3.5rem" weight={700} color="#E0E5E9" className="mb-2">
              {post.title}
            </Text>
            <Text as="h1" size="1rem" weight={600} color="#888D93" className="post__header__category">
              {post.category?.name}
            </Text>
            <div className="post__header">
              <div className="d-flex flex-row w-100 mt-1 post__header__lineSpaceBottom">
                <Text as="h1" size="1rem" weight={600} color="#888D93" className="mb-0 text-uppercase">
                  {post.author?.name} - {formatDate(post.createdAt)}
                </Text>
              </div>
            </div>
            <Text
              as="h1"
              size="1.125rem"
              weight={400}
              color="#E0E5E9"
              className="post__header__lineSpaceTop mb-5 lh-base post__content"
            >
              {post.content}
            </Text>
          </div>
        </div>
      </Col>
    </Section>
  );
};

export default SeeOnePost;
