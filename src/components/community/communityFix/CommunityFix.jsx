import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import instance from '../../../shared/Request';

import lobbyBackGround from '../../../images/png/lobbyBackGround.png';
import SocialHeader from '../../socialHeader/SocialHeader';

import './style.scss';

export default function CommunityFix({ postId, postDetail, fixmodal }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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

  const postOnChangeHandler = (e) => {
    setContent(e.target.value);
  };

  const titleOnChangeHandler = (e) => {
    setTitle(e.target.value);
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
            onChange={titleOnChangeHandler}
            placeholder="글제목을 입력해주세요."
            defaultValue={postDetail.title}
          />
          <textarea
            className="fixPostInput fontSemiBold"
            maxLength={500}
            onChange={postOnChangeHandler}
            placeholder="내용을 입력해주세요."
            defaultValue={postDetail.content}
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
