import { writeComment } from 'api/comments';
import { useState } from 'react';

const CommentForm = ({ id, handleCommentUpdate }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      return alert('댓글 내용을 입력해주세요.');
    }

    try {
      await writeComment(id, content);
      setContent('');
      alert('댓글 작성이 완료되었습니다.');
      handleCommentUpdate();
    } catch (error) {
      const message = error.response?.data || '댓글 작성에 실패했습니다.';
      console.error(message);
      alert(message);
    }
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
