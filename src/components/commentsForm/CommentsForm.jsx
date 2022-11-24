import React, { useEffect, useState } from 'react';
import './style.scss';
import { useParams } from 'react-router-dom';
import instance from '../../shared/Request';
import CommentPost from '../commentPost/CommentPost';
import CommentsList from '../commentsList/CommentsList';

function CommentsForm() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  // 전체 게시글 조회 api
  const getAllComments = async (payload) => {
    await instance.get(`/lier/post/${payload}`).then((response) => {
      const getComments = response.data.data.comments;
      setComments(getComments);
    });
  };

  useEffect(() => {
    getAllComments(id);
  }, []);

  return (
    <>
      <div className="commentsLayout">
        <span>{`댓글 ${comments.length}`}</span>
        <CommentPost />
        <CommentsList comments={comments} />
      </div>
    </>
  );
}

export default CommentsForm;
