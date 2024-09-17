import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from 'api/posts';
import { QUERY_KEYS } from 'components/hooks/query/keys.constant';
import TextEditor from 'components/TextEditor';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostFormPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addTodoMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POST] });
      alert('게시물 작성이 완료되었습니다!');
      navigate('/post-list');
    },
    onError: (error) => {
      const message = error.response?.data || '게시물 작성 중 오류가 발생했습니다.';
      console.error(message);
      alert(message);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return alert('제목을 입력해주세요,');
    }

    if (!content.trim()) {
      return alert('내용을 입력해주세요,');
    }

    addTodoMutation.mutate({ title, content });
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
