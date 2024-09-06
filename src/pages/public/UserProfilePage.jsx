import { getMembersProfile } from 'api/auth';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UserProfilePage = () => {
  const { id } = useParams();
  const [memberProfile, setMemberProfile] = useState(null);
  const [memberProfilePosts, setMemberProfilePosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadMemberProfile = async () => {
      const response = await getMembersProfile(id);
      setMemberProfile(response.data.member);
      setMemberProfilePosts(response.data.posts);

      try {
      } catch (error) {
        const message = error.response?.data || '프로필을 불러오는 중 오류가 발생했습니다.';
        console.error(message);
        alert(message);
      } finally {
        setLoading(false);
      }
    };
    loadMemberProfile();
  }, [id]);

  if (loading) return <p>로딩 중...</p>;
  if (!memberProfile) return <p>회원 프로필을 찾을 수 없습니다.</p>;

  return (
    <div>
      <h1>{memberProfile.nickname}님의 프로필</h1>
      <p>이름: {memberProfile.name}</p>
      <p>닉네임: {memberProfile.name}</p>
      <h2>작성한 글 목록</h2>
      {memberProfilePosts.length > 0 ? (
        <ul>
          {memberProfilePosts.map((memberProfilePost) => (
            <li key={memberProfilePost.id} onClick={() => navigate(`/posts/${memberProfilePost.id}`)}>
              <p>{memberProfilePost.title}</p>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <p>작성한 글이 없습니다.</p>
        </>
      )}
    </div>
  );
};

export default UserProfilePage;
