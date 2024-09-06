import { useState, useEffect } from 'react';
import { fetchReplies, createReply } from 'api/comments';
import CommentsReplyForm from './CommentsReplyForm';
import CommentsReplyList from './CommentsReplyList';

const CommentReply = ({ commentId }) => {
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const loadFetchReplies = async () => {
      try {
        const response = await fetchReplies(commentId);
        setReplies(response.data);
      } catch (error) {
        const message = error.response.data;
        console.error(message);
        alert(message);
      }
    };
    loadFetchReplies();
  }, [commentId]);

  const handleAddReply = async (replyContent) => {
    try {
      await createReply(commentId, replyContent);
      // 답글 작성 후 최신 리스트를 가져오기
      const response = await fetchReplies(commentId);
      setReplies(response.data);
      alert('답글 작성이 완료되었습니다.');
    } catch (error) {
      const message = error.response.data;
      console.error(message);
      alert(message);
    }
  };

  return (
    <div>
      <CommentsReplyForm onAddReply={handleAddReply} />
      <CommentsReplyList replies={replies} />
    </div>
  );
};

export default CommentReply;
