import React, { useEffect } from 'react';

import './style.scss';
import lobbyBackGround from '../../../images/png/lobbyBackGround.png';
import communutyBox from '../../../images/png/communityBox.png';
import { useNavigate, useParams } from 'react-router-dom';
import instance from '../../../shared/Request';
import { ReactComponent as PenIcon } from '../../../images/svg/PenIcon.svg';
import { ReactComponent as SearchIcon } from '../../../images/svg/SearchIcon.svg';
import { ReactComponent as DropBoxDown } from '../../../images/svg/DropBoxIconDown.svg';
import { ReactComponent as PageBtnIconR } from '../../../images/svg/PageBtnIconR.svg';
import { ReactComponent as PageBtnIconL } from '../../../images/svg/PageBtnIconL.svg';
import { useState } from 'react';
import CommunityCard from '../communityCard/CommunityCard';

import { current } from '@reduxjs/toolkit';

export default function CommunityList({ post }) {
  const navigate = useNavigate();
  const { pageNum } = useParams();

  //// 조회 값을 담은 state ////
  const [data, setDate] = useState([]);
  console.log('길이', data.length);

  ///////////////////////////////////////////
  // 현재 보고있는 페이지
  const [currentPage, setCurrentPage] = useState(1);

  //한 페이지에서 보여줄 길이
  const [pageSize, setPageSize] = useState(data.length);

  // 전체 게시물 수
  const [postsCnt, setPostsCnt] = useState();

  //페이지 수
  const [maxPage, setMaxPage] = useState();

  console.log('max', postsCnt);
  const total = maxPage;
  const array = [];
  for (let i = 0; i < total; i++) {
    array.push(i + 1);
  }

  const target = array.slice(0, 5);

  //// 페이지네이션 ////
  const [page, setPage] = useState(1);

  const pageUp = () => {
    if (maxPage <= 5) return;
    setPage((p) => p - 1);
  };

  const pageDown = () => {
    if (maxPage >= 5) return;
    setPage((p) => p + 1);
  };

  const pageCntNum = () => {
    const sum = 1;
    for (const i = 0; i <= maxPage; i++) {
      sum += i;
    }
  };

  //// 최신순 인기순 창 열고 닽는 state ////
  const [show, setShow] = useState(false);

  const onClickHandler = () => {
    navigate('/social/write');
  };

  const dropBoxClickHandler = () => {
    setShow(true);
  };

  //전체 조회 요청
  useEffect(() => {
    instance
      .get(`/lier/posts/${pageNum}/sort/recent`)

      .then((res) => {
        console.log('저를 데이터로 쓰세요..', res.data);
        setDate(res.data.data.pageInPosts);
        setPostsCnt(res.data.data.postsCnt);
        setMaxPage(res.data.data.pageCnt);
      })
      .catch((error) => {
        console.log('실패');
      });
  }, []);

  //최신순 조회 요청
  const recentClickHandler = () => {
    instance
      .get(`/lier/posts/${pageNum}/sort/recent`)
      .then((res) => {
        setDate(res.data.data.pageInPosts);
        setPostsCnt(res.data.data.postsCnt);
        setShow(false);
      })
      .catch((error) => {
        console.log('실패');
      });
  };

  //인기순 조회 요청
  const viewClickHandler = () => {
    instance
      .get(`/lier/posts/${pageNum}/sort/view`)
      .then((res) => {
        setDate(res.data.data.pageInPosts);
        setPostsCnt(res.data.data.postsCnt);
        setShow(false);
      })
      .catch((error) => {
        console.log('실패');
      });
  };

  return (
    <>
      <div className="communityBackground">
        <div className="searchBox">
          <input />
          <SearchIcon className="searchIcon" />
        </div>
        <div className="communityImgBackground">
          <div className="communityBoxImg">
            <div className="communityListMainBox">
              <div className="communityRoomNum">
                <h5>게시글 총 {postsCnt}개</h5>
                <div className="listDropBox" onClick={dropBoxClickHandler}>
                  <h4>최신순</h4> <DropBoxDown />
                  {show === true ? (
                    <div className="dropDownBox">
                      <div className="recentBox" onClick={recentClickHandler}>
                        최신순
                      </div>
                      <div className="viewBox" onClick={viewClickHandler}>
                        인기순
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div className="communityListBox">
                <div className="communityTitleBox">
                  <h3 className="communityTitle">제목</h3>
                  <h3 className="communityNum">조회수</h3>
                  <h3 className="communityDate">작성일</h3>
                </div>
                <div>
                  <h3 className="communityNameBox">닉네임</h3>
                </div>
              </div>
              <CommunityCard postDetail={data} />
              <div className="communityBtnBox">
                <button className="writeBtn" onClick={onClickHandler}>
                  <PenIcon className="penIcon" />
                  글쓰기
                </button>
                <div className="pageListBox">
                  <a href="#" onClick={pageUp}>
                    <div className="communityListarrowBoxL">
                      {page > 1 ? <PageBtnIconL /> : ''}
                    </div>
                  </a>
                  {target.map((val) => (
                    <div>
                      <div
                        className="pageListNum"
                        onClick={() => {
                          setPostsCnt(val);
                        }}
                      >
                        {val}
                      </div>
                    </div>
                  ))}

                  <a href="#" onClick={pageDown}>
                    <div className="communityListarrowBoxR">
                      {page < maxPage ? <PageBtnIconR /> : ''}
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
