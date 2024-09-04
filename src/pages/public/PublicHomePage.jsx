import { useAuth } from 'context/AuthContext';

const PublicHomePage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>안녕하세요 {user ? user.nickname : 'Guest'}님!</h1>
    </div>
  );
};

export default PublicHomePage;
