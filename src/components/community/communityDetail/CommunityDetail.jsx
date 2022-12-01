import CommunityFix from '../communityFix/CommunityFix';
import CommunityWrite from '../communityWrite/CommunityWrite';
import { ReactComponent as FixIcon } from '../../../images/svg/FixIcon.svg';
import { ReactComponent as DeleteIcon } from '../../../images/svg/DeleteIcon.svg';
import './style.scss';
import { useState } from 'react';

import React, { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import instance from '../../../shared/Request';

export default function CommunityDetail() {
  const [fix, setFix] = useState(false);
  const [postDetail, setPostDetail] = useState('');
  const { postId } = useParams();
  console.log('postid', postId);
  const navigate = useNavigate();
  const fixOnClickHamdler = () => {
    setFix(true);
  };
  //삭제 요청
  const deleteOnClickHancler = () => {
    instance
      .delete(`/lier/post/${postId}`)
      .then(() => {
        console.log('성공');
        navigate('/social/list/1');
      })
      .catch((error) => {
        console.log('실패');
      });
  };

  useEffect(() => {
    instance
      .get(`/lier/post/${postId}`)
      .then((res) => {
        setPostDetail(res.data.data);
        console.log('악시오스성공', res.data);
        console.log('성공');
      })
      .catch((error) => {
        console.log('상세조회실패');
      });
  }, []);

  return (
    <>
      <div className="communityDetailBox">
        <div className="detailBoxImg">
          <div className="detailMainBox">
            <div className="detailBtnTitleBox">
              <div className="detailBtnBox">
                <button onClick={fixOnClickHamdler}>
                  <FixIcon className="detailsvgIcon" />
                  수정
                </button>
                {fix === true ? (
                  <CommunityFix fixmodal={setFix} postfix={fix} />
                ) : (
                  ''
                )}
                <button onClick={deleteOnClickHancler}>
                  <DeleteIcon className="detailsvgIcon" />
                  삭제
                </button>
              </div>
              <div className="detailPostBox">
                <h2>{postDetail.title}</h2>
                <div className="detailPostInformation">
                  <h4>{postDetail.author} |</h4>{' '}
                  <h4>{postDetail.createdAt} |</h4>
                  <h4>조회수 {postDetail.viewcnt}</h4>
                </div>
              </div>
            </div>

            <div className="detailPostContent">
              <h4>{postDetail.content}</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
