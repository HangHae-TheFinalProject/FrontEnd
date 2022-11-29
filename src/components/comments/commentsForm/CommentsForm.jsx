import React, { useEffect, useState } from 'react';
import './style.scss';
import { useParams } from 'react-router-dom';
import instance from '../../../shared/Request';
import CommentPost from '../commentPost/CommentPost';
import CommentsList from '../commentsList/CommentsList';

function CommentsForm() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  // 게시글 상세 조회 api
  const getAllComments = async (payload) => {
    try {
      await instance.get(`/lier/post/${payload}`).then((response) => {
        const getComments = response.data.data.comments;
        setComments(getComments);
      });
    } catch (error) {
      console.log('게시글 상세 조회', error);
    }
  };

  useEffect(() => {
    getAllComments(id);
  }, [id]);

  return (
    <div className="commentsLayout">
      <span className="commentsCount fontBold">{`댓글 ${comments.length}`}</span>
      <CommentsList comments={comments} />
      <CommentPost />
    </div>
  );
}

export default CommentsForm;
