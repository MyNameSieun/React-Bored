import { fetchPosts } from 'api/posts';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { sortByDate } from 'utils/sortUtils';

const PostListPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetchPosts();
        const sortedPosts = sortByDate(response.data, sortOrder); // 게시글 정렬
        setPosts(sortedPosts);
      } catch (error) {
        console.error(error);
        alert(error.response.data);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, [sortOrder]); // sortOrder가 변경될 때 게시글을 다시 정렬

  if (loading) {
    return <p>로딩 중...</p>;
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
