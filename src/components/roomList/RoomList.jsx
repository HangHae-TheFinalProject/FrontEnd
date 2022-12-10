import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import ARoom from '../aRoom/ARoom';
import { __getRooms } from '../../redux/modules/roomsSlice';

import { ReactComponent as IcArrowLeft } from '../../images/svg/icArrowLeft.svg';
import { ReactComponent as IcArrowRight } from '../../images/svg/icArrowRight.svg';
import { ReactComponent as DropBoxDown } from '../../images/svg/DropBoxIconDown.svg';
import { ReactComponent as Refresh } from '../../images/svg/refresh.svg';

import Modal from '../../elements/modal/Modal';
import './style.scss';
// need to : API connection & redux

function RoomList() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [view, setView] = useState('total');
  const { maxPage, rooms, isLoading } = useSelector((state) => state.rooms);
  const [dropName, setDropName] = useState('전체');

  const [show, setShow] = useState(false);
  const [openGameRule, setOpenGameRule] = useState(false);

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

  useEffect(() => {
    loadRooms();
  }, [page, view]);

  useEffect(() => {
    loadRooms();
    window.addEventListener('load', loadRooms);
    return window.removeEventListener('load', loadRooms);
  }, []);

  const totalClickHandler = () => {
    setView('total');
    setDropName('전체');
  };
  const normalClickHandler = () => {
    setView('normal');
    setDropName('일반모드');
  };
  const foolClickHandler = () => {
    setView('fool');
    setDropName('바보모드');
  };
  const waitClickHandler = () => {
    setView('wait');
    setDropName('대기중');
  };
  const startClickHandler = () => {
    setView('start');
    setDropName('진행중');
  };

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
              <li value="total" onClick={totalClickHandler}>
                전체
              </li>
              <li value="normal" onClick={normalClickHandler}>
                일반모드
              </li>
              <li value="fool" onClick={foolClickHandler}>
                바보모드
              </li>
              <li value="wait" onClick={waitClickHandler}>
                대기중
              </li>
              <li value="start" onClick={startClickHandler}>
                진행중
              </li>
            </div>
          ) : (
            ''
          )}
        </ul>
      </div>
      <div className="sectionRoomList">
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
      </div>
    </>
  );
}

export default RoomList;
