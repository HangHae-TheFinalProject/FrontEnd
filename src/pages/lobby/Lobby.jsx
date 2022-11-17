import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '../../elements/modal/Modal';
import RoomList from '../../components/roomList/RoomList';
import CreateRoomForm from '../../components/createRoomForm/CreateRoomForm';

import './style.scss'

// need to : page nation
function Lobby() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  

  return <div className='pagesection'>
    <div>
      <input type='button' value='방만들기' onClick={()=>setOpenModal(true)}/>
      <input type='button' value='커뮤니티' onClick={()=>navigate('/social/list')}/>
      <input type='button' value='마이페이지' onClick={()=>navigate('/mypage')}/>
    </div>
    <RoomList />
    {openModal && <Modal onClose={()=>setOpenModal(false)} content={<CreateRoomForm />} />}
  </div>
}

export default Lobby;