import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import instance from '../../../shared/Request';
import useInput from '../../../hooks/useInput';

import lobbyBackGround from '../../../images/png/lobbyBackGround.png';
import SocialHeader from '../../socialHeader/SocialHeader';

import './style.scss';

export default function CommunityFix({ postId, postDetail, fixmodal }) {
  const navigate = useNavigate();

  const [title, titleHandler] = useInput(postDetail.title);
  const [content, contentHandler] = useInput(postDetail.content);

  //수정 요청
  const fixOnClickHandler = () => {
    if (title.trim() === '') {
      return alert('수정할 제목을 입력해주세요');
    } else if (content.trim() === '') {
      return alert('수정할 내용을 입력해주세요');
    }
    instance
      .put(`/lier/post/${postId}`, {
        title: title,
        content: content,
      })
      .then((res) => {
        alert(res.data.statusMsg);
        navigate('/social');
      })
      .catch((error) => {
        alert('수정할 내용을 입력해 주세요.');
      });
  };
  const cancelClickHandler = () => {
    fixmodal(false);
  };

  return (
    <div className="communityFixBox fontLightBold">
      <img
        className="communityFixBackgroundImg"
        src={lobbyBackGround}
        alt="background"
      />
      <SocialHeader />
      <div className="fixBoxImg">
        <div className="fixTitle">글 수정하기</div>
        <div className="fixInputBox">
          <input
            className="fixTitleInput fontSemiBold"
            maxLength={100}
            onChange={titleHandler}
            placeholder="글제목을 입력해주세요."
            value={title}
          />
          <textarea
            className="fixPostInput fontSemiBold"
            maxLength={500}
            onChange={contentHandler}
            placeholder="내용을 입력해주세요."
            value={content}
          />
        </div>
        <div className="communityFixBtnBox">
          <button className="fixRegistrationBtn" onClick={fixOnClickHandler}>
            수정하기
          </button>
          <button className="fixCancelBtn" onClick={cancelClickHandler}>
            취소하기
          </button>
        </div>
      </div>
    </div>
  );
}
