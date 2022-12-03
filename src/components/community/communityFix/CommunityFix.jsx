import { useEffect, useState } from 'react';
import instance from '../../../shared/Request';
import { useParams, useNavigate } from 'react-router-dom';
import './style.scss';
export default function CommunityFix(fixmodal) {
  const navigate = useNavigate();
  useEffect(() => {});
  const { postId } = useParams();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [postsDetail, setPostsDetail] = useState({});
  //수정 요청
  const fixOnClickHandler = () => {
    instance
      .put(`/lier/post/${postId}`, {
        title: title,
        content: content,
      })
      .then((res) => {
        alert(res.data.statusMsg);

        navigate('/social');

        console.log('수정성공', res);
        console.log('성공');
      })
      .catch((error) => {
        alert('수정할 내용을 입력해 주세요.');
      });
  };

  useEffect(() => {
    instance
      .get(`/lier/post/${postId}`)
      .then((res) => {
        setPostsDetail(res.data.data);
        console.log('악시오스성공', res.data.data);
        console.log('성공');
      })
      .catch((error) => {
        console.log('상세조회실패');
      });
  }, []);
  const postOnChangeHandler = (e) => {
    setContent(e.target.value);
  };
  const titleOnChangeHandler = (e) => {
    setTitle(e.target.value);
  };
  const cancelClickHandler = () => {
    fixmodal.fixmodal(false);
  };
  return (
    <>
      <div className="communityFixBox">
        <div className="fixBoxImg">
          <div className="fixTitle">글 수정하기</div>
          <div>
            <input
              className="fixTitleInput"
              onChange={postOnChangeHandler}
              placeholder="글제목을 입력해주세요."
              defaultValue={postsDetail.title}
            ></input>
            <textarea
              className="fixPostInput"
              onChange={titleOnChangeHandler}
              placeholder="내용을 입력해주세요."
              defaultValue={postsDetail.content}
            ></textarea>
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
    </>
  );
}
