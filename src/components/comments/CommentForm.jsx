import { useMutation, useQueryClient } from '@tanstack/react-query';
import { writeComment } from 'api/comments';
import { QUERY_KEYS } from 'components/hooks/query/key';
import { useState } from 'react';

const CommentForm = ({ id }) => {
  const [content, setContent] = useState('');

  const queryClient = useQueryClient();

  const addCommentMutation = useMutation({
    mutationFn: () => writeComment(id, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMMENTS] });
      alert('댓글 추가 완료!');
      setContent('');
    },
    onError: (error) => {
      const message = error.response?.data || '댓글 작성에 실패했습니다.';
      console.error(message);
      alert(message);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      return alert('댓글 내용을 입력해주세요.');
    }

    addCommentMutation.mutate();
  };

  return (
    <div>
      <h2>댓글을 작성해주세요.</h2>
      <form onSubmit={handleSubmit}>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="댓글을 입력하세요." />
        <button type="submit">작성하기</button>
      </form>
    </div>
  );
};

export default CommentForm;
