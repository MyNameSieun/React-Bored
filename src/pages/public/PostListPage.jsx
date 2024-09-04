import { fetchPosts } from 'api/posts';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PostListPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // HTML 태그 제거 및 엔터티 변환 함수
  const convertHtmlEntities = (htmlString) => {
    // HTML 엔터티를 텍스트로 변환
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc.body.textContent || '';
  };

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetchPosts();
        setPosts(response.data);
      } catch (error) {
        console.error(error);
        alert(error.response.data);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return (
    <div>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => {
            const textContent = convertHtmlEntities(post.content); // HTML 엔터티 변환
            return (
              <StPostItem key={post.id} onClick={() => navigate(`/posts/${post.id}`)}>
                <h3>제목: {post.title}</h3>
                <p>내용: {textContent}</p> {/* HTML 엔터티가 변환된 내용 표시 */}
                <p>작성일: {post.createdAt}</p>
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
