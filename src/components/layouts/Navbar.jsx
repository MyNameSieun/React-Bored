import { logout } from 'api/auth';
import { useAuth } from 'context/AuthContext';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = () => {
  const { setUser, isSignIn } = useAuth();

  const hanldeLogout = async () => {
    try {
      const logoutConfirm = window.confirm('정말 로그아웃 하시겠습니까?');
      if (logoutConfirm) {
        await logout();
        alert('로그아웃 되었습니다.');
        setUser(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StNavbarContainer>
      <StNavLink to="/">로고</StNavLink>
      <StNav>
        {isSignIn ? (
          <>
            <StNavLink to="/my-page">마이페이지</StNavLink>
            <StNavLink to="/post-form">글 작성</StNavLink>
            <StNavLink to="/post-list">글 목록</StNavLink>
            <StLogout onClick={hanldeLogout}>로그아웃</StLogout>
          </>
        ) : (
          <>
            <StNavLink to="/post-list">글 목록</StNavLink>
            <StNavLink to="/my-page">마이페이지</StNavLink>
            <StNavLink to="/sign-in">로그인</StNavLink>
            <StNavLink to="/sign-up">회원가입</StNavLink>
          </>
        )}
      </StNav>
    </StNavbarContainer>
  );
};

export default Navbar;

const StNavbarContainer = styled.nav`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StNav = styled.div`
  display: flex;
  justify-content: end;
`;
const StNavLink = styled(NavLink)`
  margin: 0 6px;
  &.active {
    color: red;
    font-weight: bold;
  }
`;

const StLogout = styled.div`
  cursor: pointer;
`;
