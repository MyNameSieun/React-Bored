import { useProfileQuery } from 'components/hooks/query/useTodosQuery';
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const isSignIn = !!user; // 로그인 상태 확인

  const { isLoading, error } = useProfileQuery(setUser);

  if (isLoading) {
    return <p>로딩중...</p>;
  }

  if (error) {
    return <p>에러 발생 {error.data}</p>;
  }

  return <AuthContext.Provider value={{ user, setUser, isSignIn }}>{children}</AuthContext.Provider>;
};

// export default AuthContext;
// const { user, login, logout, isSignIn } = useAuth(); 와 같이 사용 가능
export const useAuth = () => useContext(AuthContext);
