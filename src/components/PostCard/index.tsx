import React from 'react';
import { HiUserCircle } from 'react-icons/hi';
import { useHistory } from 'react-router';
import Text from '../Text';
import IPost from '../../interfaces/IPost';
import formatDate from '../../utils/formatDate';
import './styles.scss';

interface Props {
  post: IPost;
}

const PostCard = ({ post }: Props): React.ReactElement => {
  const { title, author, category, createdAt, id } = post;

  const history = useHistory();

  return (
    <div
      className="postCard m-3"
      onClick={() => history.push(`/post/${id}`)}
      onKeyUp={(event) => event.key === 'Enter' && history.push(`post/${id}`)}
      role="button"
      tabIndex={0}
    >
      <div className="d-flex flex-row">
        <HiUserCircle size={50} color="#E0E5E9" className="postCard__icon" />
        <div className="d-flex flex-column w-100 mx-3">
          <div className="d-flex flex-row w-100 mt-1">
            <Text as="small" size="1rem" weight={500} color="#888D93" className="mb-0 postCard__post__authorName">
              {author.name}
            </Text>
            <Text as="small" size="0.875rem" weight={500} color="#888D93" className="ml-auto mb-0 pl-3">
              {formatDate(createdAt)}
            </Text>
          </div>
          <Text as="h3" size="1.375rem" weight={700} color="#E0E5E9" className="postCard__post__title">
            {title}
          </Text>
          <Text as="p" size="0.9375rem" weight={500} color="#E0E5E9" className="postCard__post__category">
            {category.name}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
