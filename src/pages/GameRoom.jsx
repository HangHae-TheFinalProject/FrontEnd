import { useParams } from 'react-router-dom';

function GameRoom() {
  const {id} = useParams();

  return <>
    <h1> GameRoom </h1>
  </>
}

export default GameRoom;