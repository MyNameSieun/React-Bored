import { deletePost, fetchPostById, updatePost } from 'api/posts';
import CommentForm from 'components/comments/CommentForm';
import CommentReply from 'components/comments/CommentReply';
import CommentsList from 'components/comments/CommentsList';
import { useAuth } from 'context/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PostDetailPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user } = useAuth();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadPostById = async () => {
      try {
        const response = await fetchPostById(id);
        setPost(response.data);
      } catch (error) {
        const message = error.response.data;
        console.error(message);
        alert(message);
      } finally {
        setLoading(false);
      }
    };
    loadPostById();
  }, [id]);

  if (loading) {
    return <p>로딩중...</p>;
  }

  // 삭제
  const handleDeleteButton = async () => {
    const deleteConfirm = window.confirm('정말 삭제하시겠습니까?');
    try {
      if (deleteConfirm) {
        alert('게시글이 삭제되었습니다.');
        navigate('/post-list', { replace: true });
        await deletePost(id);
      }
    } catch (error) {
      const message = error.response?.data || '게시글 삭제 중 오류가 발생했습니다.';
      console.error(message);
      alert(message);
    }
  };

  // 수정 모드 전환
  const handleEditModeButton = async () => {
    try {
      setIsEditMode(true);
    } catch (error) {
      console.error(error);
    }
  };

  // 수정 완료
  const handleEdit = async () => {
    try {
      await updatePost(id, { title, content });
      setPost((setPost) => ({ ...setPost, title, content }));
      setIsEditMode(false);
    } catch (error) {
      const message = error.response?.data || '게시글 수정 중 오류가 발생했습니다.';
      console.error(message);
      alert(message);
    }
  };

  return (
    <div>
      {isEditMode ? (
        <>
          <ul>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            <li>{post.content}</li>
          </ul>
          <button onClick={() => setIsEditMode(null)}>수정 취소</button>
          <button onClick={handleEdit}>수정완료</button>
        </>
      ) : (
        <>
          <ul>
            <li>{post.title}</li>
            <li>{post.content}</li>
            <li>{post.createdAt}</li>
          </ul>
          {post.author.id === user.id && (
            <>
              <button onClick={handleDeleteButton}>삭제</button>
              <button onClick={handleEditModeButton}>수정하기</button>
            </>
          )}

          <CommentForm />
          <CommentsList />
        </>
      )}
    </div>
  );
};

export default PostDetailPage;
