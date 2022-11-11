import { useParams } from 'react-router-dom';
import VideoRoomComponent from '../../components/videoroom/components/VideoRoomComponent';
import './style.scss';

function GameRoom() {
  const { id } = useParams();

  return <div className='gameRoomSection'>
    <div className='videoSection'>
      <VideoRoomComponent openviduServerUrl='https://cheiks.shop' />
    </div>
    <div className='textSection'>
      
    </div>
  </div>
}

export default GameRoom;