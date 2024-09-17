import CommentsReplyForm from './CommentsReplyForm';
import CommentsReplyList from './CommentsReplyList';

const CommentReply = ({ commentId }) => {
  return (
    <div>
      <CommentsReplyForm commentId={commentId} />
      <CommentsReplyList commentId={commentId} />
    </div>
  );
};

export default CommentReply;
