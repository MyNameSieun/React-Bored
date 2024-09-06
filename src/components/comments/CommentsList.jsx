import { deleteComment, fetchComments, updateComment } from 'api/comments';
import { useEffect, useState } from 'react';
import CommentReply from './CommentReply';
import { useAuth } from 'context/AuthContext';

const CommentsList = ({ id, handleCommentUpdate }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(null);
  const [editContent, setEditContent] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const loadComments = async () => {
      try {
        const response = await fetchComments(id);
        setComments(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadComments();
  }, [id, handleCommentUpdate]);

  if (loading) {
    return <p>로딩중...</p>;
  }

  // 댓글 삭제
  const handleDeleteComment = async (commentId) => {
    const confirmed = window.confirm('정말 삭제하시겠습니까?');
    if (confirmed) {
      try {
        await deleteComment(id, commentId);
        // 댓글 삭제 후 댓글 목록을 새로 고침
        handleCommentUpdate();
        alert('삭제 되었습니다.');
      } catch (error) {
        const message = error.response.data;
        alert(message);
        console.error(message);
      }
    }
  };

  // 수정 모드
  const handleEditMode = (comment) => {
    setEditMode(comment.id); // 수정 모드 활성화
    setEditContent(comment.content); // 현재 댓글 내용으로 초기화
  };

  // 수정 모드 취소
  const handleCancelEdit = () => {
    setEditMode(null);
    setEditContent('');
  };

  // 댓글 수정
  const handleEditComment = async (commentId) => {
    try {
      await updateComment(id, commentId, editContent);
      // 댓글 수정 후 댓글 목록을 새로 고침
      handleCommentUpdate();
      setEditMode(null);
      alert('수정되었습니다.');
    } catch (error) {
      const message = error.response.data;
      alert(message);
      console.error(message);
    }
  };

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          {editMode === comment.id ? (
            <>
              <input type="text" value={editContent} onChange={(e) => setEditContent(e.target.value)} />
              <p>{comment.createdAt}</p>
              <p>{comment.author.nickname}</p>
              <button onClick={handleCancelEdit}>취소</button>
              <button onClick={() => handleEditComment(comment.id)}>저장</button>
              <hr />
            </>
          ) : (
            <>
              <p>{comment.content}</p>
              <p>{comment.createdAt}</p>
              <p>{comment.author.nickname}</p>
              {user && user.id === comment.author.id && (
                <>
                  <button onClick={() => handleDeleteComment(comment.id)}>삭제</button>
                  <button onClick={() => handleEditMode(comment)}>수정</button>
                </>
              )}
              <CommentReply commentId={comment.id} />
              <hr />
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default CommentsList;
