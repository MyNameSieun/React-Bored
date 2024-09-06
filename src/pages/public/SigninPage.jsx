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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ email, password1 });
      alert('로그인이 완료되었습니다.');
      setUser(response.data); // 로그인 성공 후 사용자 정보 업데이트
      navigate('/');
    } catch (error) {
      const massage = error.response.data;
      console.log(massage); // 개발자 확인
      setError(massage); // 사용자 확인
    }
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
