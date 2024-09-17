import { useMutation } from '@tanstack/react-query';
import { login } from 'api/auth';
import { useAuth } from 'context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SigninPage = () => {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      alert('로그인이 완료되었습니다.');
      setUser(response.data); // 로그인 성공 후 사용자 정보 업데이트
      navigate('/');
    },
    onError: (error) => {
      const message = error.response?.data || '로그인 중 오류가 발생했습니다.';
      setError(message); // 사용자에게 오류 메시지 표시
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    loginMutation.mutate({ email, password1 });
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">이메일</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password1">비밀번호</label>
          <input type="password1" id="password1" value={password1} onChange={(e) => setPassword1(e.target.value)} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default SigninPage;
