import { useQuery } from '@tanstack/react-query';
import { fetchReplies } from 'api/comments';
import { QUERY_KEYS } from 'components/hooks/query/key';

const CommentsReplyList = ({ commentId }) => {
  // 답글 로드
  const {
    data: replies = [],
    isLoading,
    error
  } = useQuery({
    queryKey: [QUERY_KEYS.REPLIES, commentId],
    queryFn: () => fetchReplies(commentId)
  });

  if (isLoading) {
    return <p>로딩중...</p>;
  }

  if (error) {
    return <p>에러 발생: {error.message}</p>;
  }

  return (
    <ul>
      {replies.map((reply) => (
        <li key={reply.id}>
          <h3>ㄴ</h3>
          <p>내용: {reply.content}</p>
          <p>작성자: {reply.author.nickname}</p>
        </li>
      ))}
    </ul>
  );
};

export default CommentsReplyList;
