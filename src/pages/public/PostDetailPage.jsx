import { deletePost, fetchPostById, updatePost } from 'api/posts';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import TextEditor from 'components/TextEditor';
import CommentsList from 'components/comments/CommentsList';
import CommentForm from 'components/comments/CommentForm';
import { useAuth } from 'context/AuthContext';

const PostDetailPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [refreshComments, setRefreshComments] = useState(false); // 댓글 새로 고침 상태

  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadDetailpost = async () => {
      try {
        const response = await fetchPostById(id);
        setPost(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        const message = error.response?.data || '게시글을 가져오는 중 오류가 발생했습니다.';
        console.error(message);
        alert(message);
      } finally {
        setLoading(false);
      }
    };
    loadDetailpost();
  }, [id, refreshComments]);

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
  const handleEditButton = () => {
    setIsEditing(true);
  };

  // 수정 내용 저장
  const handleSaveButton = async () => {
    try {
      await updatePost(id, { title, content });
      setPost((prevPost) => ({
        ...prevPost,
        title,
        content
      }));
      setIsEditing(false);
      alert('게시글이 수정되었습니다.');
    } catch (error) {
      const message = error.response?.data || '게시글 수정 중 오류가 발생했습니다.';
      console.error(message);
      alert(message);
    }
  };

  // 수정 취소
  const handleCancelButton = () => {
    setIsEditing(false);
    setTitle(post.title);
    setContent(post.content);
  };

  // 댓글 새로 고침 상태 토글
  const handleCommentUpdate = () => {
    setRefreshComments((prev) => !prev);
  };

  return (
    <div>
      <StFontAwesomeIcon icon={faAngleLeft} onClick={() => navigate(-1)} />
      {post ? (
        <ul key={post.id}>
          {isEditing ? (
            <>
              <li>
                제목:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
              </li>
              <li>
                <TextEditor theme="snow" value={content} onChange={setContent} />
              </li>
              <button onClick={handleSaveButton}>저장</button>
              <button onClick={handleCancelButton}>취소</button>
            </>
          ) : (
            <>
              <li>제목: {post.title}</li>
              <li
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.content)
                }}
              />
              <li>작성일: {post.createdAt}</li>
              <p>작성자: {post.author.nickname}</p>

              <p onClick={() => navigate(`/user-profile/${post.author.id}`)}>
                {post.author.nickname}이 쓴 글 보러가기(클릭)
              </p>
              {user && user.id === post.author.id && (
                <>
                  <button onClick={handleDeleteButton}>삭제</button>
                  <button onClick={handleEditButton}>수정</button>
                </>
              )}
              <CommentForm id={id} handleCommentUpdate={handleCommentUpdate} />
              <CommentsList id={id} handleCommentUpdate={handleCommentUpdate} />
            </>
          )}
        </ul>
      ) : (
        <p>등록되지 않았거나 삭제된 글입니다</p>
      )}
    </div>
  );
};

export default PostDetailPage;

const StFontAwesomeIcon = styled(FontAwesomeIcon)`
  color: #353535;
  font-size: 55px;
  cursor: pointer;
`;
