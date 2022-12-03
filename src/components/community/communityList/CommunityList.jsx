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
  const MAX_PAGE_NUM = 5;

  const navigate = useNavigate();

  const [currentSortBase, setCurrentSortBase] = useState('recent');
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [searchCurrentPageNum, setSearchCurrentPageNum] = useState(1);
  const [pageNum, setPageNum] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [data, setData] = useState([]);
  const [postsCnt, setPostsCnt] = useState();
  const [arrPage, setArrPage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);
  const [view, setView] = useState(false);

  const onClickHandler = () => {
    navigate('/social/write');
  };

  const dropBoxClickHandler = () => {
    setShow(true);
  };

  const pageUp = () => {
    setPageNum((pageNum) => pageNum - 1);
  };

  const pageDown = () => {
    setPageNum((pageNum) => pageNum + 1);
  };

  const showList = () => {
    setIsLoading(true);
    instance
      .get(`/lier/posts/${currentPageNum}/sort/${currentSortBase}`)
      .then((res) => {
        console.log('showList', res);
        setMaxPage(res.data.data.pageCnt);
        setData(res.data.data.pageInPosts);
        setPostsCnt(res.data.data.postsCnt);
        setShow(false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const searchOnChangeHandler = (e) => {
    setValue(e.target.value);
  };
  const searchOnClickHandler = () => {
    setCurrentPageNum(1);
    instance
      .post(`/lier/search/post/${currentPageNum}`, { value: value })
      .then((res) => {
        console.log('검색', res);
        setMaxPage(res.data.data.pageCnt);
        setData(res.data.data.pageInPosts);
        setPostsCnt(res.data.data.postsCnt);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const showPageNumbers = () => {
    let arr = [];
    const start = (pageNum - 1) * MAX_PAGE_NUM;

    for (let i = 1 + start; i <= 5 + start; i++) {
      if (i > maxPage) break;
      arr.push(i);
    }
    setArrPage([...arr]);
    setCurrentPageNum(start + 1);
  };

  useEffect(() => {
    showList();
  }, [currentPageNum, currentSortBase]);

  useEffect(() => {
    showPageNumbers();
  }, [pageNum, isLoading]);

  useEffect(() => {
    console.log('currentPageNum' + currentPageNum);
    console.log('pageNum' + pageNum);
    console.log('arr', arrPage);
  });

  return (
    <>
      <div className="communityBackground">
        <div className="communityImgBackground">
          <div className="searchAndMainBox">
            <div className="searchBox">
              <input onChange={searchOnChangeHandler} />
              <SearchIcon
                className="searchIcon"
                onClick={searchOnClickHandler}
              />
            </div>
            <div className="communityBoxImg">
              <div className="communityListMainBox">
                <div className="communityRoomNum">
                  <h5>게시글 총 {postsCnt}개</h5>
                  <div className="communitySelectBox">
                    <ul
                      className="communitySelectMain"
                      onClick={() => {
                        setView(!view);
                      }}
                    >
                      {currentSortBase === 'recent' ? '최신순' : '인기순'}{' '}
                      <DropBoxDown className="dropBoxArrow" />
                      {view && (
                        <div className="dropBoxBody">
                          <li
                            className="recentBox"
                            onClick={() => setCurrentSortBase('recent')}
                          >
                            최신순
                          </li>
                          <li
                            className="viewBox"
                            onClick={() => setCurrentSortBase('view')}
                          >
                            인기순
                          </li>
                        </div>
                      )}
                    </ul>
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
                    <div className="communityListarrowBoxL">
                      {pageNum > 1 ? (
                        <a href="#" onClick={pageUp}>
                          <PageBtnIconL />
                        </a>
                      ) : (
                        ''
                      )}
                    </div>
                    <div className="pageListNum">
                      {arrPage.map((val) => (
                        <div
                          key={val}
                          onClick={() => {
                            setCurrentPageNum(val);
                          }}
                        >
                          {console.log(val)}
                          {val}
                        </div>
                      ))}
                      {/* {arrPage.map((val) => (
                        <div
                          key={val}
                          onClick={() => {
                            setSearchCurrentPageNum(val);
                          }}
                        >
                          {console.log(val)}
                          {val}
                        </div>
                      ))} */}
                    </div>
                    <div className="communityListarrowBoxR">
                      {maxPage > MAX_PAGE_NUM &&
                      pageNum < maxPage / MAX_PAGE_NUM ? (
                        <a href="#" onClick={pageDown}>
                          <PageBtnIconR />
                        </a>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
