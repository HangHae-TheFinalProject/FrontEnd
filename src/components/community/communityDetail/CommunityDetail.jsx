import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import instance from '../../../shared/Request';

import { ReactComponent as FixIcon } from '../../../images/svg/FixIcon.svg';
import { ReactComponent as DeleteIcon } from '../../../images/svg/DeleteIcon.svg';
import lobbyBackGround from '../../../images/png/lobbyBackGround.png';

import CommunityFix from '../communityFix/CommunityFix';
import CommentsForm from '../../comments/commentsForm/CommentsForm';
import SocialHeader from '../../socialHeader/SocialHeader';

import './style.scss';

export default function CommunityDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const nickname = sessionStorage.getItem('nickname');

  const [postDetail, setPostDetail] = useState('');
  const [comments, setComments] = useState([]);
  const [fix, setFix] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 게시글 상세 조회 api
  const getAllComments = (payload) => {
    instance
      .get(`/lier/post/${payload}`)
      .then((response) => {
        setPostDetail(response.data.data);
        setComments(response.data.data.comments);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const fixOnClickHandler = () => {
    setFix(true);
  };

  // 삭제 요청 api
  const deleteOnClickHandler = () => {
    const result = window.confirm('게시글을 정말로 삭제하시겠습니까?');
    if (result)
      instance
        .delete(`/lier/post/${postId}`)
        .then((res) => {
          alert(res.data.data);
          navigate('/social');
        })
        .catch((error) => {});
  };

  useEffect(() => {
    getAllComments(postId);
  }, [postId, isLoading]);

  return (
    <>
      <div className="communityDetailBox">
        <img
          className="communityDetailBackgroundImg"
          src={lobbyBackGround}
          alt="background"
        />
        <SocialHeader />
        <div className="detailBoxImg">
          <div className="detailMainBox">
            <div className="detailPostBox">
              <div className="detailPostTitleBox">
                <h2>{postDetail.title}</h2>
                {nickname === postDetail.author ? (
                  <div className="detailBtnBox">
                    <button onClick={fixOnClickHandler}>
                      <FixIcon className="detailsvgIcon" />
                      수정
                    </button>
                    {fix === true ? (
                      <CommunityFix
                        postId={postId}
                        postDetail={postDetail}
                        fixmodal={setFix}
                        postfix={fix}
                      />
                    ) : (
                      ''
                    )}
                    <button onClick={deleteOnClickHandler}>
                      <DeleteIcon className="detailsvgIcon" />
                      삭제
                    </button>
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className="detailPostInformation">
                <h4 className="postInfoAuthor fontBold">
                  {postDetail.author?.replace(/#\d*/, '')}
                </h4>
                <h4 className="postInfoElement">| {postDetail.createdAt}</h4>
                <h4 className="postInfoElement">
                  | 조회수 {postDetail.viewcnt}
                </h4>
              </div>
              <div className="detailPostContent fontRegular">
                <h4 className="postContent">{postDetail.content}</h4>
              </div>
            </div>
            <CommentsForm
              postId={postId}
              comments={comments}
              setIsLoading={setIsLoading}
              nickname={nickname}
            />
          </div>
        </div>
      </div>
    </>
  );
}
