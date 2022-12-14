import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../../../shared/Request';

import CommunityCard from '../communityCard/CommunityCard';
import lobbyBackGround from '../../../images/png/lobbyBackGround.png';
import { ReactComponent as PenIcon } from '../../../images/svg/PenIcon.svg';
import { ReactComponent as SearchIcon } from '../../../images/svg/SearchIcon.svg';
import { ReactComponent as DropBoxDown } from '../../../images/svg/DropBoxIconDown.svg';
import { ReactComponent as PageBtnIconR } from '../../../images/svg/PageBtnIconR.svg';
import { ReactComponent as PageBtnIconL } from '../../../images/svg/PageBtnIconL.svg';

import './style.scss';

export default function CommunityList({ post }) {
  const START_PAGE_NUM = 1;
  const MAX_PAGE_NUM = 5;

  const navigate = useNavigate();

  const [currentSortBase, setCurrentSortBase] = useState('recent');
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [searchCurrentPageNum, setSearchCurrentPageNum] = useState(1);
  const [pageNum, setPageNum] = useState(0);
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

  const pageUp = () => {
    const num = pageNum - 1;
    const pagenum = num * MAX_PAGE_NUM + START_PAGE_NUM;

    setPageNum(num);
    setCurrentPageNum(pagenum);
  };

  const pageDown = () => {
    const num = pageNum + 1;
    const pagenum = num * MAX_PAGE_NUM + START_PAGE_NUM;

    setPageNum(num);
    setCurrentPageNum(pagenum);
  };

  const searchOnChangeHandler = (e) => {
    setValue(e.target.value);
  };

  const searchOnClickHandler = () => {
    setCurrentPageNum(1);
    instance
      .post(`/lier/search/post/${currentPageNum}`, { value: value })
      .then((res) => {
        setMaxPage(res.data.data.pageCnt);
        setData(res.data.data.pageInPosts);
        setPostsCnt(res.data.data.postsCnt);
      })
      .catch((error) => {
        alert(error.response.data.data);
      });
  };

  const showList = () => {

    setIsLoading(true);
    instance
      .get(`/lier/posts/${currentPageNum}/sort/${currentSortBase}`)
      .then((res) => {
        setMaxPage(res.data.data.pageCnt);
        setData(res.data.data.pageInPosts);
        setPostsCnt(res.data.data.postsCnt);
        setShow(false);
        setIsLoading(false);
        showPageNumbers(res.data.data.pageCnt);
      });
  };

  const showPageNumbers = (maxPage) => {

    let arr = [];
    const start = (pageNum) * MAX_PAGE_NUM;

    for (let i = start; i < 5 + start; i++) {
      if (i + START_PAGE_NUM > maxPage) break;
      arr.push(i + START_PAGE_NUM);
    }

    setArrPage([...arr]);
  };

  useEffect(() => {
    showList();
  }, [currentPageNum, currentSortBase]);

  useEffect(() => {
    if (isLoading) return
    showPageNumbers();
  }, [pageNum, currentSortBase]);

  return (
    <div className="communityBackground fontBold">
      <img
        className="communityBackgroundImg"
        src={lobbyBackGround}
        alt="background"
      />
      <div className="searchAndMainBox">
        <div className="searchBox fontSemiBold">
          <input
            onChange={searchOnChangeHandler}
            onKeyPress={(e) =>
              e.key === 'Enter' && searchOnClickHandler({ value: value })
            }
          />
          <SearchIcon
            className="searchIcon"
            onClick={searchOnClickHandler}
            onKeyPress={(e) =>
              e.key === 'Enter' && searchOnClickHandler({ value: value })
            }
          />
        </div>
        <div className="communityBoxImg">
          <div className="communityListMainBox">
            <div className="communityInfoLine fontSemiBold">
              <div className="communityRoomNum">????????? ??? {postsCnt}???</div>
              <div className="communitySelectBox">
                <ul
                  className="communitySelectMain"
                  onClick={() => {
                    setView(!view);
                  }}
                >
                  {currentSortBase === 'recent' ? '?????????' : '?????????'}
                  <DropBoxDown className="dropBoxArrow" />
                  {view && (
                    <div className="dropBoxBody">
                      <li
                        className="recentBox"
                        onClick={() => setCurrentSortBase('recent')}
                      >
                        ?????????
                      </li>
                      <li
                        className="viewBox"
                        onClick={() => setCurrentSortBase('view')}
                      >
                        ?????????
                      </li>
                    </div>
                  )}
                </ul>
              </div>
            </div>
            <div className="communityListBox">
              <div className="communityTitleBox">
                <h3 className="communityTitle">??????</h3>
                <h3 className="communityCommentsNum">??????</h3>
                <h3 className="communityNum">?????????</h3>
                <h3 className="communityDate">?????????</h3>
              </div>
              <div>
                <h3 className="communityNameBox">?????????</h3>
              </div>
            </div>
            <div className="communityCardSection">
              <CommunityCard postDetail={data} />
            </div>
            <div className="communityBtnBox">
              <button className="writeBtn" onClick={onClickHandler}>
                <PenIcon className="penIcon" />
                <p>?????????</p>
              </button>
              <div className="pageListBox">
                <div className="communityListarrowBoxL">
                  {pageNum + START_PAGE_NUM > 1 ? (
                    <a href="#" onClick={pageUp}>
                      <PageBtnIconL />
                    </a>
                  ) : (
                    ''
                  )}
                </div>
                <div className="pageListNum" >
                  {arrPage.map((val) => (
                    <div className="pageListNumAPage" key={val} onClick={() => { setCurrentPageNum(val) }}>
                      {val}
                    </div>
                  ))}
                </div>
                <div className="communityListarrowBoxR">
                  {maxPage > MAX_PAGE_NUM &&
                    pageNum + START_PAGE_NUM < maxPage / MAX_PAGE_NUM ? (
                    <a href="#" onClick={pageDown} >
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
  );
}
