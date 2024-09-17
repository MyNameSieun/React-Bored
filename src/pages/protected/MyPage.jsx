import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateNickname } from 'api/auth';
import { QUERY_KEYS } from 'components/hooks/query/keys.constant';
import { useProfileQuery } from 'components/hooks/query/useTodosQuery';
import { useAuth } from 'context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MyPage = () => {
  const { user, setUser } = useAuth();
  const [newNickname, setNewNickname] = useState('');
  const [isEditingNickname, setIsEditingNickname] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 닉네임 변경
  const nicknameChangeMutation = useMutation({
    mutationFn: updateNickname,
    onSuccess: () => {
      setUser((prevUser) => ({
        ...prevUser,
        nickname: newNickname
      }));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROFILE] });
      setNewNickname('');
      setIsEditingNickname(false);
      alert('닉네임이 성공적으로 변경되었습니다!');
    },
    onError: (error) => {
      console.error('닉네임 변경 중 오류 발생:', error);
      alert('닉네임 변경 중 문제가 발생했습니다. 다시 시도해 주세요.');
    }
  });

  const handleNicknameChange = async (e) => {
    e.preventDefault();

    nicknameChangeMutation.mutate(newNickname);
  };

  // 프로필 로드
  const { data, isLoading, error } = useProfileQuery(setUser);

  if (isLoading) {
    return <p>로딩중...</p>;
  }

  if (error) {
    return <p>에러 발생 {error.data}</p>;
  }

  const { member, posts } = data;

  return (
    <div>
      <h1>{member.nickname}'s Profile</h1>
      <ul>
        <li>이름: {member.name}</li>
        <li>이메일: {member.email}</li>
        <li>닉네임: {member.nickname}</li>
        <div>
          {isEditingNickname ? (
            <form onSubmit={handleNicknameChange}>
              <input
                type="text"
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
                placeholder="새로운 닉네임을 입력하세요"
                required
              />
              <button type="submit">닉네임 변경</button>
              <button type="button" onClick={() => setIsEditingNickname(false)}>
                취소
              </button>
            </form>
          ) : (
            <button onClick={() => setIsEditingNickname(true)}>닉네임 변경</button>
          )}
        </div>
      </ul>
      <section>
        <h2>내가 작성한 글 보기</h2>
        {posts.length > 0 ? (
          <StPostList>
            {posts.map((post) => (
              <li key={post.id} onClick={() => navigate(`/posts/${post.id}`)}>
                <p>제목: {post.title}</p>
                <p>작성일: {post.createdAt}</p>
                <hr />
              </li>
            ))}
          </StPostList>
        ) : (
          <p>작성한 글이 없습니다.</p>
        )}
      </section>
    </div>
  );
};

export default MyPage;

const StPostList = styled.ul`
  cursor: pointer;
  list-style-type: none;
  padding: 0;
  border: 1px solid black;
`;
