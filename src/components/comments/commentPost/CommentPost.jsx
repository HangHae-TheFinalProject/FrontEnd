import React, { useState } from 'react';
import instance from '../../../shared/Request';

import './style.scss';

function CommentPost({ postId, setIsLoading }) {
  const [comment, setComment] = useState('');

  // 댓글 작성 api
  const postComment = (payload) => {
    setIsLoading(true);
    if (comment.trim() === '') return alert('내용을 입력해주세요');
    instance
      .post(`/lier/comment/${postId}`, payload)
      .then(() => {
        setComment('');
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  return (
    <div className="commentInputContainer">
      <textarea
        className="commentInput fontBold"
        maxLength={150}
        placeholder="댓글 내용을 입력해주세요."
        value={comment}
        onKeyPress={(e) =>
          e.key === 'Enter' && postComment({ content: comment })
        }
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        className="commentInputBtn fontBold"
        onClick={() => postComment({ content: comment })}
      >
        등록
      </button>
    </div>
  );
}

export default CommentPost;
