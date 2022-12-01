import { useState } from 'react';
import instance from '../../../shared/Request';
import { useNavigate } from 'react-router-dom';
import './style.scss';
export default function CommunityWrite() {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const navigate = useNavigate();

  const postOnClickHandler = () => {
    instance
      .post('/lier/post', {
        title: title,
        content: content,
      })
      .then((res) => {
        console.log('성공');
        navigate('/social');
      })
      .catch((error) => {
        console.log('실패');
      });

    // console.log(title, content);
    // dispatch(__postWrite({ title, content }));
  };

  const titleOnChangeHandler = (e) => {
    setTitle(e.target.value);
  };
  const contentOnChangeHandler = (e) => {
    setContent(e.target.value);
  };
  const cancelClickHandler = () => {
    navigate('/social');
  };

  return (
    <>
      <div className="communityWriteBox">
        <div className="writeBoxImg">
          <div className="writeTitle">
            <h3>새로운 글 작성하기</h3>
          </div>
          <div>
            <input
              type="text"
              className="writeTitleInput"
              placeholder="제목을 입력해주세요"
              onChange={titleOnChangeHandler}
            ></input>
            <textarea
              className="writePostInput"
              placeholder="내용을 입력해주세요"
              onChange={contentOnChangeHandler}
            ></textarea>
          </div>
          <div className="communityWriteBtnBox">
            <button
              className="writeRegistrationBtn"
              onClick={postOnClickHandler}
            >
              등록하기
            </button>
            <button className="writeCancelBtn" onClick={cancelClickHandler}>
              취소하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
