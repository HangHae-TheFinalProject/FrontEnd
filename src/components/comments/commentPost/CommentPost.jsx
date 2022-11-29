import React, { useState } from 'react';
import './style.scss';
import { useParams } from 'react-router-dom';
import instance from '../../../shared/Request';

function CommentPost({ setIsLoading }) {
  // const { id } = useParams();
  const id = 1;
  const [comment, setComment] = useState('');

  // 댓글 작성 api
  const postComment = async (payload) => {
    setIsLoading(true);
    try {
      if (comment.trim() === '') return alert('내용을 입력해주세요');
      await instance.post(`/lier/comment/${id}`, payload);
      setComment('');
      setIsLoading(false);
    } catch (error) {
      console.log('댓글 작성', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="commentInputContainer">
      <textarea
        className="commentInput fontBold"
        maxLength={200}
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
