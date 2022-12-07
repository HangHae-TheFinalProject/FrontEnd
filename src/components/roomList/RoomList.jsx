import ARoom from '../aRoom/ARoom';
import './style.scss';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { __getRooms } from '../../redux/modules/roomsSlice';
import { useSelector } from 'react-redux';
import { ReactComponent as IcArrowLeft } from '../../images/svg/icArrowLeft.svg';
import { ReactComponent as IcArrowRight } from '../../images/svg/icArrowRight.svg';
import { ReactComponent as DropBoxDown } from '../../images/svg/DropBoxIconDown.svg';
// need to : API connection & redux

function RoomList() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
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
  }

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
    <div>

      <div className="selectbox">
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
          {!isLoading && rooms?.map((aroom) => {
            console.log(isLoading)
            return <ARoom key={aroom.id} roomInfo={aroom} />;
          })}
        </div>
        <a href="#" onClick={pageDown}>
          <div className="arrowBoxR">
            {page < maxPage ? <IcArrowRight /> : ''}
          </div>
        </a>
      </div>
    </div>
  );
}

export default RoomList;
