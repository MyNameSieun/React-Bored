import Layout from 'components/layouts/Layout';
import MyPage from 'pages/protected/MyPage';
import PostFormPage from 'pages/public/PostFormPage';
import SigninPage from 'pages/public/SigninPage';
import SignupPage from 'pages/public/SignupPage';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PostListPage from 'pages/public/PostListPage';
import PostDetailPage from 'pages/public/PostDetailPage';
import UserProfilePage from 'pages/public/UserProfilePage';
import PublicHomePage from 'pages/public/PublicHomePage';

const Router = () => {
  // 공통 라우트 설정
  const commonRoutes = [
    { path: '/', element: <PublicHomePage /> }, // 모든 사용자에게 기본 페이지로 제공
    { path: '/post-list', element: <PostListPage /> },
    { path: '/posts/:id', element: <PostDetailPage /> },
    { path: '/user-profile/:id', element: <UserProfilePage /> }
  ];

  // 비인증 사용자 전용 라우터 설정
  const notAuthenticatedRoutes = [
    { path: '/sign-in', element: <SigninPage /> },
    { path: '/sign-up', element: <SignupPage /> }
  ];

  // 인증 사용자 전용 라우트 설정
  const authenticatedRoutes = [
    {
      element: <ProtectedRoute />, // 보호된 라우트 적용
      children: [
        { path: '/my-page', element: <MyPage /> },
        { path: '/post-form', element: <PostFormPage /> }
      ]
    }
  ];

  // 404 페이지 라우트 설정
  const notFound = {
    path: '*',
    element: <Navigate to="/" />
  };

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [...commonRoutes, ...notAuthenticatedRoutes, ...authenticatedRoutes]
    },
    notFound
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
