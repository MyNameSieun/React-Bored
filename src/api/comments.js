import axios from 'axios';

const commentsAxios = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true
});

// 댓글 작성
export const writeComment = async (postId, content) => {
  return await commentsAxios.post(`/posts/${postId}/comment`, { content });
};

// 댓글 수정
export const updateComment = async (postId, commentId, content) => {
  return await commentsAxios.put(`/posts/${postId}/comment/${commentId}`, { content });
};

// 댓글 삭제
export const deleteComment = async (postId, commentId) => {
  return await commentsAxios.delete(`/posts/${postId}/comment/${commentId}`);
};

// 댓글 조회
export const fetchComments = async (postId) => {
  return await commentsAxios.get(`/posts/${postId}/comments`);
};

// 댓글에 답글 작성
export const createReply = async (parentId, content) => {
  return await commentsAxios.post(`/reply/${parentId}`, { content });
};

// 댓글에 답글 조회
export const fetchReplies = async (parentId) => {
  return await commentsAxios.get(`/comments/${parentId}/replies`);
};
