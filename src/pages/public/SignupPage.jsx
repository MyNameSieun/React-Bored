import { register } from 'api/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      await register({ name, nickname, email, password1, password2 });
      alert('회원 가입이 완료되었습니다.');
      navigate('/sign-in'); // 회원 가입 성공 후 로그인 페이지로 리다이렉트
    } catch (error) {
      const message = error.response.data;
      setError(message || '회원가입 중 문제가 발생했습니다.'); // 사용자 확인
      console.log(message); // 개발자 확인
    }
  };

  return (
    <div>
      <h2>회원 가입</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">이름</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="nickname">닉네임</label>
          <input type="text" id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="email">이메일</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="password1">비밀번호</label>
          <input
            type="password"
            id="password1"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password2">비밀번호 확인</label>
          <input
            type="password"
            id="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">회원 가입</button>
      </form>
    </div>
  );
};

export default SignupPage;
