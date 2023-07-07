import { IComments } from '@/types/interfaces';
import CommentItem from './CommentItem';

interface CommentFeedProps {
  comments?: IComments[];
}

const CommentFeed: React.FC<CommentFeedProps> = ({ comments = [] }) => {
  return (
    <>
      {comments && comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} />
      ))}
    </>
  );
};

export default CommentFeed;