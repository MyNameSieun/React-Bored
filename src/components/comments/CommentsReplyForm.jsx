import { useState } from 'react';

const CommentsReplyForm = ({ onAddReply }) => {
  const [replyContent, setReplyContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!replyContent.trim()) {
      return alert('답글을 입력하세요.');
    }

    await onAddReply(replyContent);
    setReplyContent('');
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
