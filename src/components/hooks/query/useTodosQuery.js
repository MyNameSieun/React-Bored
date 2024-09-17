import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './keys.constant';
import { fetchComments, fetchReplies } from 'api/comments';
import { sortByDate } from 'utils/sortUtils';
import { fetchPosts } from 'api/posts';
import { getMembersProfile, getProfile } from 'api/auth';

// 게시물 조회
export const usePostsQuery = (sortOrder) => {
  return useQuery({
    queryKey: [QUERY_KEYS.POST, sortOrder],
    queryFn: async () => {
      const data = await fetchPosts();
      return sortByDate(data, sortOrder); // 데이터를 받아온 후 정렬
    },
    onError: (error) => {
      console.error(error);
      alert(error.response.data);
    }
  });
};

// 댓글 조회
export const useCommentsQuery = (id) => {
  return useQuery({
    queryKey: [QUERY_KEYS.COMMENTS, id],
    queryFn: () => fetchComments(id),
    onSuccess: (data) => {
      console.log('데이터가 성공적으로 가져와졌습니다:', data);
    },
    onError: (error) => {
      console.error('댓글을 불러오는 중 오류가 발생했습니다:', error);
    }
  });
};

// 답글 조회
export const useRepliesQuery = (commentId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.REPLIES, commentId],
    queryFn: () => fetchReplies(commentId)
  });
};

// 프로필 조회
export const useProfileQuery = (setUser) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PROFILE],
    queryFn: getProfile,
    onSuccess: (data) => {
      setUser(data.member); // 사용자 상태 업데이트
    },
    onError: (error) => {
      console.error(error);
      setUser(null); // 오류 발생 시 사용자 상태를 null로 설정
    }
  });
};

// 타 사용자 프로필 조회
export const useMemberProfileQuery = (id) => {
  return useQuery({
    queryKey: [QUERY_KEYS.MEMBER_PROFILE, id],
    queryFn: () => getMembersProfile(id),
    onSuccess: (data) => {
      console.log('데이터가 성공적으로 가져와졌습니다:', data);
    },
    onError: (error) => {
      console.error('프로필을 불러오는 중 오류가 발생했습니다:', error);
    }
  });
};
