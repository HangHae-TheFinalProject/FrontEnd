import ARoom from '../aRoom/ARoom';
import './style.scss';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { __getRooms } from '../../redux/modules/roomsSlice';
import { useSelector } from 'react-redux';
import { ReactComponent as IcArrowLeft } from '../../images/svg/icArrowLeft.svg';
import { ReactComponent as IcArrowRight } from '../../images/svg/icArrowRight.svg';
// need to : API connection & redux

function RoomList() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [view, setView] = useState('total');
  const { maxPage, rooms, error } = useSelector((state) => state.rooms);

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

  useEffect(() => {
    dispatch(__getRooms({ page: page, view: view }));
  }, [page, view]);

  return (
    <div>
      <div className="selectBox">
        <select className="selectMain" onChange={selectHandler}>
          <option value="total">전체</option>
          <option value="normal">일반모드</option>
          <option value="fool">바보모드</option>
          <option value="wait">대기중</option>
          <option value="start">진행중</option>
        </select>
      </div>
      <div className="sectionRoomList">
        <a href="#" onClick={pageUp}>
          <div className="arrowBoxL">{page > 1 ? <IcArrowLeft /> : ''}</div>
        </a>
        <div className="roomListBox">
          {rooms?.map((aroom) => {
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
