import axios from 'axios';

const authAxios = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL, // 환경 변수에서 기본 URL을 설정
  withCredentials: true // 쿠키를 자동으로 포함시키기 위한 설정
});

// Axios 인스턴스 생성
authAxios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error('에러가 발생하였습니다. 문의해주세요.', error);
    return Promise.reject({ state: 'ERROR', message: error.message });
  }
);

// authApi.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // 로그인 페이지로 리디렉션
//       window.location.href = '/sign-in';
//     }
//     return Promise.reject(error);
//   }
// );

// 회원 가입
export const register = async (data) => {
  return await authAxios.post(`/members/new`, data);
};

// 로그인
export const login = async (data) => {
  return await authAxios.post(`/login`, data);
};

// 로그아웃
export const logout = async () => {
  return await authAxios.get(`/logout`);
};

// 프로필 조회
export const getProfile = async () => {
  return await authAxios.get(`/profile`);
};

// 프로필 닉네임 변경
export const updateNickname = async (newNickname) => {
  return await authAxios.post(`/profile/updateNickname`, { newNickname });
};

// 타 사용자 프로필 조회
export const getMembersProfile = async (memberId) => {
  return await authAxios.get(`/members/${memberId}/profile`);
};
