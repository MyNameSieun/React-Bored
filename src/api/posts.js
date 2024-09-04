import axios from 'axios';

const postsAxios = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true
});

// 게시글 작성
export const createPost = async (data) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('content', data.content);

  return await postsAxios.post(`/posts/new`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

// 게시글 목록 조회
export const fetchPosts = async () => {
  return await postsAxios.get(`/posts`);
};

// 특정 게시글 조회
export const fetchPostById = async (id) => {
  return await postsAxios.get(`/posts/${id}`);
};

// 게시글 삭제
export const deletePost = async (id) => {
  return await postsAxios.delete(`/posts/${id}`);
};

// 게시글 수정
export const updatePost = async (id, data) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('content', data.content);

  return await postsAxios.put(`/posts/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
