import React, { useEffect, useState } from 'react';
import './style.scss';
import { useParams } from 'react-router-dom';
import instance from '../../../shared/Request';
import CommentPost from '../commentPost/CommentPost';
import CommentsList from '../commentsList/CommentsList';

function CommentsForm() {
  // const { id } = useParams();
  const id = 1;
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 게시글 상세 조회 api
  const getAllComments = (payload) => {
    try {
      instance.get(`/lier/post/${payload}`).then((response) => {
        const getComments = response.data.data.comments;
        setComments(getComments);
        setIsLoading(false);
      });
    } catch (error) {
      console.log('게시글 상세 조회', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllComments(id);
    console.log(isLoading);
  }, [id, isLoading]);

  return (
    <div className="commentsLayout">
      <span className="commentsCount fontBold">{`댓글 ${comments.length}`}</span>
      <CommentsList comments={comments} setIsLoading={setIsLoading}/>
      <CommentPost setIsLoading={setIsLoading}/>
    </div>
  );
}

export default CommentsForm;
