import { deletePost, fetchPostById, updatePost } from 'api/posts';
import { useState } from 'react';
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
import dayjs from 'dayjs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const PostDetailPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 삭제
  const deletePostMutation = useMutation({
    mutationFn: () => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      alert('삭제 완료!');
      navigate('/post-list', { replace: true });
    },
    onError: (error) => {
      const message = error.response?.data || '게시글 삭제 중 오류가 발생했습니다.';
      console.error(message);
      alert(message);
    }
  });

  const handleDeleteButton = async () => {
    const isConfirmed = window.confirm('정말로 삭제하시겠습니까?');
    if (isConfirmed) {
      deletePostMutation.mutate();
    }
  };

  const editPostMutation = useMutation({
    mutationFn: () => updatePost(id, { title, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setIsEditing(false);
      alert('게시글이 수정되었습니다.');
    },
    onError: (error) => {
      const message = error.response?.data || '게시글 수정 중 오류가 발생했습니다.';
      console.error(message);
      alert(message);
    }
  });

  const handleSaveButton = async () => {
    editPostMutation.mutate();
  };

  // 조회
  const {
    data: post = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['post'],
    queryFn: () => fetchPostById(id)
  });

  if (isLoading) {
    return <p>로딩중...</p>;
  }

  // 에러 중 처리
  if (error) {
    return <p>에러 발생: {error.message}</p>;
  }

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
              <button onClick={() => setIsEditing(false)}>취소</button>
            </>
          ) : (
            <>
              <li>제목: {post.title}</li>
              <li
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.content)
                }}
              />
              <li>작성일: {dayjs(post.createdAt).format('YYYY/MM/DD')}</li>
              <p>작성자: {post.author.nickname}</p>

              <p onClick={() => navigate(`/user-profile/${post.author.id}`)}>
                {post.author.nickname}이 쓴 글 보러가기(클릭)
              </p>
              {user && user.id === post.author.id && (
                <>
                  <button onClick={handleDeleteButton}>삭제</button>
                  <button onClick={() => setIsEditing(true)}>수정</button>
                </>
              )}
              <CommentForm id={id} />
              <CommentsList id={id} />
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
