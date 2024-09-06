import { getProfile, updateNickname } from 'api/auth';
import { useAuth } from 'context/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MyPage = () => {
  const { user, setUser } = useAuth();
  const [userPosts, setUserPosts] = useState([]);
  const [newNickname, setNewNickname] = useState('');
  const [isEditingNickname, setIsEditingNickname] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await getProfile();
        setUser(response.data.member); // 사용자 상태 업데이트
        setUserPosts(response.data.posts); // 게시글 상태 업데이트
      } catch (error) {
        console.error(error);
        setUser(null); // 오류 발생 시 사용자 상태를 null로 설정
      }
    };
    loadUser();
  }, [setUser]);

  const handleNicknameChange = async (e) => {
    e.preventDefault();
    try {
      await updateNickname(newNickname);
      setUser((prevUser) => ({
        ...prevUser,
        nickname: newNickname
      }));
      setNewNickname('');
      setIsEditingNickname(false);
      alert('닉네임이 성공적으로 변경되었습니다!');
    } catch (error) {
      console.error('닉네임 변경 중 오류 발생:', error);
      alert('닉네임 변경 중 문제가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  const handleChangeNicknameClick = () => {
    setIsEditingNickname(true);
  };

  return (
    <div>
      <h1>{user.nickname}'s Profile</h1>
      <ul>
        <li>이름: {user.name}</li>
        <li>이메일: {user.email}</li>
        <li>닉네임: {user.nickname}</li>
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
            <button onClick={handleChangeNicknameClick}>닉네임 변경</button>
          )}
        </div>
      </ul>
      <section>
        <h2>내가 작성한 글 보기</h2>
        {userPosts.length > 0 ? (
          <StPostList>
            {userPosts.map((userPost) => (
              <li key={userPost.id} onClick={() => navigate(`/posts/${userPost.id}`)}>
                <p>제목: {userPost.title}</p>
                <p>작성일: {userPost.createdAt}</p>
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
