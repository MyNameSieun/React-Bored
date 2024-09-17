import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReply } from 'api/comments';
import { QUERY_KEYS } from 'components/hooks/query/keys.constant';
import { useState } from 'react';

const CommentsReplyForm = ({ commentId }) => {
  const [replyContent, setReplyContent] = useState('');
  const queryClient = useQueryClient();

  // 답글 작성
  const addReplyMutation = useMutation({
    mutationFn: ({ commentId, replyContent }) => createReply(commentId, replyContent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REPLIES] });
      alert('답글 작성이 완료되었습니다.');
      setReplyContent('');
    },
    onError: (error) => {
      const message = error.response.data;
      console.error(message);
      alert(message);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!replyContent.trim()) {
      return alert('답글을 입력하세요.');
    }

    addReplyMutation.mutate({ commentId, replyContent });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)}
        placeholder="답글을 입력하세요."
      />
      <button type="submit">답글 작성</button>
    </form>
  );
};

export default CommentsReplyForm;
