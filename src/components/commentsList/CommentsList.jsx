import React, { useEffect, useState } from 'react';
import './style.scss';
import CommentItem from '../commentItem/CommentItem';

function CommentsList({ comments }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (comments) return setValue(comments);
  }, []);

  return (
    <>
      {value.map((comment) => (
        <CommentItem key={comment.commentid} comment={comment} />
      ))}
    </>
  );
}

export default CommentsList;
