import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import styled from 'styled-components';
import { CommonContainer } from 'styles/CommonContainer';

const Layout = () => {
  return (
    <StLayout>
      <StContainer>
        <Navbar />
        <Outlet />
      </StContainer>
    </StLayout>
  );
};

export default Layout;

const StLayout = styled.main`
  width: 100%;
  height: 100vh;
`;

const StContainer = styled(CommonContainer)`
  flex-direction: column;
  min-height: 100vh;
`;
