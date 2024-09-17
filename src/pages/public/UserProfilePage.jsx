import { useQuery } from '@tanstack/react-query';
import { getMembersProfile } from 'api/auth';
import { useNavigate, useParams } from 'react-router-dom';

const UserProfilePage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['memberProfile', id],
    queryFn: () => getMembersProfile(id),
    onSuccess: (data) => {
      console.log('데이터가 성공적으로 가져와졌습니다:', data);
    },
    onError: (error) => {
      console.error('프로필을 불러오는 중 오류가 발생했습니다:', error);
    }
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>오류 발생: {error.message}</p>;
  if (!data) return <p>회원 프로필을 찾을 수 없습니다.</p>;

  const { member, posts } = data;

  return (
    <div>
      <h1>{member.nickname}님의 프로필</h1>
      <p>이름: {member.name}</p>
      <p>닉네임: {member.name}</p>
      <h2>작성한 글 목록</h2>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id} onClick={() => navigate(`/posts/${post.id}`)}>
              <p>{post.title}</p>
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
