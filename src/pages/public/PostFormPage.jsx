import { createPost } from 'api/posts';
import TextEditor from 'components/TextEditor';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostFormPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert('제목과 내용을 모두 입력해 주세요.');
      return;
    }

    try {
      await createPost({ title, content });
      alert('게시물 작성이 완료되었습니다!');
      navigate('/post-list');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">제목</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label htmlFor="content">내용</label>
        <TextEditor value={content} onChange={setContent} />
      </div>
      <button type="submit">작성 완료</button>
    </form>
  );
};

export default PostFormPage;
