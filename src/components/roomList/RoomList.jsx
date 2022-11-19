import ARoom from '../aRoom/ARoom';
import './style.scss';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { __getRooms } from '../../redux/modules/roomsSlice'
import { useSelector } from "react-redux";


// need to : API connection & redux
function RoomList() {

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { maxPage, rooms, error } = useSelector((state) => state.rooms);

  const pageUp = () => {
    if(page <= 1) return;
    setPage((p) => p - 1);
  }

  const pageDown = () => {
    if(page >= maxPage) return;
    setPage((p) => p + 1);
  }

  useEffect(() => {
    dispatch(__getRooms(page));
  }, [page])

  return <div className='sectionRoomList'>
    <a href='#' onClick={pageUp}><div className='arrowBox'>{page > 1 ? '◀' : ''}</div></a>
    <div className='roomListBox'>
      {rooms.map(aroom => {
        return <ARoom key={aroom.id} roomInfo={aroom} />
      })}
    </div>
    <a href='#' onClick={pageDown}><div className='arrowBox'>{page < maxPage ? '▶' : ''}</div></a>
  </div>
}

export default RoomList;