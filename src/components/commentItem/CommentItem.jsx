import React, { useEffect, useState } from 'react';
import './style.scss';

function CommentItem({ comment }) {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (comment) return setValue(comment);
  }, []);

  return (
    <>
      <div>{value.author}</div>
      <div>{value.content}</div>
    </>
  );
}

export default CommentItem;
