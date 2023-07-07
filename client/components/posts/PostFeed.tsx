import PostItem from './PostItem';
import { IPost } from "@/types/interfaces";

interface PostFeedProps {
  posts: IPost[]
}

const PostFeed: React.FC<PostFeedProps> = ({posts}) => {  
  return (
    <>
      {posts.map((post) => (
        <PostItem post={post} key={post._id} />
      ))}
    </>
  );
};

export default PostFeed;