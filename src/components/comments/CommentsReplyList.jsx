const CommentsReplyList = ({ replies }) => {
  return (
    <ul>
      {replies.map((reply) => (
        <li key={reply.id}>
          <h3>ㄴ</h3>
          <p>내용: {reply.content}</p>
          <p>작성자: {reply.author.nickname}</p>
        </li>
      ))}
    </ul>
  );
};

export default CommentsReplyList;
