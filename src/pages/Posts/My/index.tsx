import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { IoMdCalendar } from 'react-icons/io';
import Aside from '../../../components/Aside';
import Text from '../../../components/Text';
import Section from '../../../components/Section';
import PostsService from '../../../services/posts.service';
import IPost from '../../../interfaces/IPost';
import { useLoader } from '../../../contexts/LoaderContext';
import toastMsg, { ToastType } from '../../../utils/toastMsg';
import formatDate from '../../../utils/formatDate';
import styles from './styles.module.scss';

const MyPosts: React.FunctionComponent = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  const history = useHistory();

  const { renderLoader } = useLoader();

  useEffect(() => {
    renderLoader('show');
    PostsService.readByUser()
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
    <Section className="p-0 d-flex" title="Meus Posts">
      <Col md={12} className={styles.postContainer}>
        <Aside />
        <div className={styles.postContainer__body}>
          <div className={styles.post}>
            <Text as="h1" size="3.5rem" weight={700} color="#E0E5E9" className="mb-2">
              Meus posts
            </Text>
            <div className="d-flex flex-column gap-3 mt-5">
              {React.Children.toArray(
                posts.map((post) => (
                  <div
                    className={styles.postCard}
                    onClick={() => history.push(`/post/${post.id}`)}
                    onKeyUp={(event) => event.key === 'Enter' && history.push(`post/${post.id}`)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="d-flex flex-column w-100">
                      <Text
                        as="h3"
                        size="1.375rem"
                        weight={700}
                        color="#E0E5E9"
                        className={styles.postCard__post__title}
                      >
                        {post.title}
                      </Text>
                      <div className="d-flex flex-row align-items-center mb-3">
                        <Text
                          as="p"
                          size="0.9375rem"
                          weight={500}
                          color="#E0E5E9"
                          className={styles.postCard__post__category}
                        >
                          {post.category.name}
                        </Text>
                        <div>
                          <IoMdCalendar size={25} color="#888d93" className="mx-2" />
                          <Text as="small" size="0.875rem" weight={500} color="#888D93" className="mb-0">
                            {formatDate(post.createdAt)}
                          </Text>
                        </div>
                      </div>
                      <Text
                        as="p"
                        size="0.9375rem"
                        weight={500}
                        color="#E0E5E9"
                        className={styles.postCard__post__content}
                      >
                        {post.content}
                      </Text>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </Col>
    </Section>
  );
};

export default MyPosts;
