import { deleteComment, fetchComments, updateComment } from 'api/comments';
import { useState } from 'react';
import CommentReply from './CommentReply';
import { useAuth } from 'context/AuthContext';
import dayjs from 'dayjs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const CommentsList = ({ id }) => {
  const [editMode, setEditMode] = useState(null);
  const [editContent, setEditContent] = useState('');
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // 댓글 삭제
  const deleteCommentMutation = useMutation({
    mutationFn: ({ id, commentId }) => deleteComment(id, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      alert('삭제 되었습니다.');
    },
    onError: (error) => {
      console.error('삭제 실패:', error);
      alert('삭제 실패. 다시 시도해 주세요.');
    }
  });

  const handleDeleteComment = async (commentId) => {
    const confirmed = window.confirm('정말 삭제하시겠습니까?');
    if (confirmed) {
      deleteCommentMutation.mutate({ id, commentId });
    }
  };

  // 댓글 수정
  // 수정 모드
  const handleEditMode = (comment) => {
    setEditMode(comment.id); // 수정 모드 활성화
    setEditContent(comment.content); // 현재 댓글 내용으로 초기화
  };

  // 댓글 수정
  const editCommentMutation = useMutation({
    mutationFn: ({ id, commentId, editContent }) => updateComment(id, commentId, editContent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      setEditMode(null);
      alert('수정되었습니다.');
    },
    onError: (error) => {
      const message = error.response.data;
      alert(message);
      console.error(message);
    }
  });

  const handleEditComment = async (commentId) => {
    editCommentMutation.mutate({ id, commentId, editContent });
  };

  // 댓글 조회
  const {
    data: comments = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => fetchComments(id),
    onSuccess: (data) => {
      console.log('데이터가 성공적으로 가져와졌습니다:', data);
    },
    onError: (error) => {
      console.error('댓글을 불러오는 중 오류가 발생했습니다:', error);
    }
  });

  if (isLoading) {
    return <p>로딩중...</p>;
  }

  if (error) {
    return <p>에러 발생: {error.message}</p>;
  }

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          {editMode === comment.id ? (
            <>
              <input type="text" value={editContent} onChange={(e) => setEditContent(e.target.value)} />
              <p>{comment.createdAt}</p>
              <p>{comment.author.nickname}</p>
              <button onClick={() => setEditMode(null)}>취소</button>
              <button onClick={() => handleEditComment(comment.id)}>저장</button>
              <hr />
            </>
          ) : (
            <>
              <p>{comment.content}</p>
              <p>{dayjs(comment.createdAt).format('YYYY/MM/DD')}</p>
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
