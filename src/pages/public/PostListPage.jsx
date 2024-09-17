import { usePostsQuery } from 'components/hooks/query/useTodosQuery';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PostListPage = () => {
  const [sortOrder, setSortOrder] = useState('desc');
  const navigate = useNavigate();

  // HTML 태그 제거 및 엔터티 변환 함수
  const convertHtmlEntities = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc.body.textContent || '';
  };

  // 정렬 순서 변경 핸들러
  const onChangeSortOrder = (e) => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder);
  };

  // 게시물 로드
  const { data: posts = [], isLoading, error } = usePostsQuery(sortOrder);

  if (isLoading) {
    return <p>로딩중...</p>;
  }

  if (error) {
    return <p>에러 발생: {error.message}</p>;
  }

  return (
    <div>
      <select value={sortOrder} onChange={onChangeSortOrder}>
        <option value="asc">오름차순</option>
        <option value="desc">내림차순</option>
      </select>

      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => {
            const textContent = convertHtmlEntities(post.content); // HTML 엔터티 변환
            return (
              <StPostItem key={post.id} onClick={() => navigate(`/posts/${post.id}`)}>
                <h3>제목: {post.title}</h3>
                <p>내용: {textContent}</p> {/* HTML 엔터티가 변환된 내용 표시 */}
                <p>작성일: {dayjs(post.createdAt).format('YYYY/MM/DD')}</p>
                <p>작성자: {post.author.nickname}</p>
                <p>댓글 수: {post.comments.length}</p>
              </StPostItem>
            );
          })}
        </ul>
      ) : (
        <p>등록된 글이 없습니다.</p>
      )}
    </div>
  );
};

export default PostListPage;

const StPostItem = styled.li`
  padding: 1rem;
  border: 1px solid black;
  cursor: pointer;

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;
