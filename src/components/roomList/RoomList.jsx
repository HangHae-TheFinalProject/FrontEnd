import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import ARoom from '../aRoom/ARoom';
import { __getRooms } from '../../redux/modules/roomsSlice';

import { ReactComponent as IcArrowLeft } from '../../images/svg/icArrowLeft.svg';
import { ReactComponent as IcArrowRight } from '../../images/svg/icArrowRight.svg';
import { ReactComponent as DropBoxDown } from '../../images/svg/DropBoxIconDown.svg';
import { ReactComponent as Refresh } from '../../images/svg/refresh.svg';

import './style.scss';

function RoomList() {
  const START_PAGE = 1;

  const ARR_ROOM_FILTER = [
    {
      key: 0,
      value: 'total',
      innerHTML: '전체'
    },
    {
      key: 1,
      value: 'normal',
      innerHTML: '일반모드'
    },
    {
      key: 2,
      value: 'fool',
      innerHTML: '바보모드'
    },
    {
      key: 3,
      value: 'wait',
      innerHTML: '대기중'
    },
    {
      key: 4,
      value: 'start',
      innerHTML: '진행중'
    }
  ]

  const dispatch = useDispatch();
  const [page, setPage] = useState(START_PAGE);
  const [view, setView] = useState('total');
  const { maxPage, rooms, isLoading } = useSelector((state) => state.rooms);

  const [dropName, setDropName] = useState('전체');

  const [show, setShow] = useState(false);

  const pageUp = () => {
    if (page <= 1) return;
    setPage((p) => p - 1);
  };

  const pageDown = () => {
    if (page >= maxPage) return;
    setPage((p) => p + 1);
  };

  const selectHandler = (event) => {
    setView(event.target.value);
    setPage(1);
  };

  const loadRooms = () => {
    dispatch(__getRooms({ page: page, view: view }));
  };

  const filterClickHandler = (event) => {
    setPage(START_PAGE);
    setView(ARR_ROOM_FILTER[event.target.value].value);
    setDropName(event.target.innerHTML);
  }

  useEffect(() => {
    loadRooms();
  }, [page, view]);

  useEffect(() => {
    loadRooms();
    window.addEventListener('load', loadRooms);
    return window.removeEventListener('load', loadRooms);
  }, []);

  return (
    <>
      <div className="lobbyFunctionBtn fontSemiBold">
        <button
          className="gameRoomRefreshBtn"
          onClick={() => {
            dispatch(__getRooms({ page: page, view: view }));
          }}
        >
          <Refresh />
          새로고침
        </button>
      </div>
      <div className="selectBox fontSemiBold">
        <ul
          className="selectMain"
          onChange={selectHandler}
          onClick={() => {
            setShow(!show);
          }}
        >
          {dropName} <DropBoxDown className="roomListDropBoxArrow " />
          {show === true ? (
            <div className="roomListDropBox">
              <ol>{
                ARR_ROOM_FILTER.map((filter) => {
                  return <li key={filter.key} value={filter.key} onClick={filterClickHandler}>
                    {filter.innerHTML}
                  </li>
                })
              }
              </ol>
            </div>
          ) : (
            ''
          )}
        </ul>
      </div>
      <div className="sectionRoomList">
        {!rooms.length ? (
          <>
            <div className="roomListBox">생성된 방이 없습니다.</div>
          </>
        ) : (
          <>
            <a href="#" onClick={pageUp}>
              <div className="arrowBoxL">{page > 1 ? <IcArrowLeft /> : ''}</div>
            </a>
            <div className="roomListBox">
              {!isLoading &&
                rooms?.map((aroom) => {
                  return <ARoom key={aroom.id} roomInfo={aroom} />;
                })}
            </div>
            <a href="#" onClick={pageDown}>
              <div className="arrowBoxR">
                {page < maxPage ? <IcArrowRight /> : ''}
              </div>
            </a>
          </>
        )}
      </div>
    </>
  );
}

export default RoomList;
