import { deletePost, fetchPostById } from 'api/posts';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PostDetailPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
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

  const handleDeletePost = async () => {
    try {
      await deletePost(id);
      alert('게시글이 삭제되었습니다.');
      navigate('/post-list', { replace: true });
    } catch (error) {
      const massage = error.response.data;
      console.log(massage);
      alert(massage);
    }
  };

  return (
    <div>
      <ul>
        <li>{post.title}</li>
        <li>{post.content}</li>
        <li>{post.createdAt}</li>
      </ul>
      <button onClick={handleDeletePost}>삭제</button>
    </div>
  );
};

export default PostDetailPage;
