import React from 'react';
import CommentItem from '../commentItem/CommentItem';

function CommentsList({ comments, setIsLoading }) {
  return (
    <>
      {comments &&
        comments.map((comment) => (
          <CommentItem key={comment.commentid} comment={comment} setIsLoading={setIsLoading}/>
        ))}
    </>
  );
}

export default CommentsList;
