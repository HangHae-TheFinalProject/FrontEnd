import React from 'react';
import './style.scss';
import CommentItem from '../commentItem/CommentItem';

function CommentsList({ comments }) {
  return (
    <>
      {comments &&
        comments.map((comment) => (
          <CommentItem key={comment.commentid} comment={comment} />
        ))}
    </>
  );
}

export default CommentsList;
