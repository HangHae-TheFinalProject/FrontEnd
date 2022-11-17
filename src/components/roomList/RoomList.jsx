import ARoom from '../aRoom/ARoom';
import './style.scss'

// need to : API connection & redux
function RoomList() {

  const mock = [{
    id: 1,
    roomName: '여서오세요!',
    mode: 1,
    member: [
      {
        createdAt: '2022-11-08T10:45:35.38043',
        modifiedAt: '2022-11-08T10:45:35.38043',
        id: 1,
        email: 'wlstpgns51@naver.com',
        password: 'ABC',
        nickname: 'rltrl#2728',
      }
    ],
    owner: 'rltrl#2728'
  },{
    id: 2,
    roomName: '여서오세요:)',
    mode: 2,
    member: [
      {
        createdAt: '2022-11-08T10:45:35.38043',
        modifiedAt: '2022-11-08T10:45:35.38043',
        id: 1,
        email: 'wlstpgns51@naver.com',
        password: 'ABC',
        nickname: 'rltrl#2728',
      }
    ],
    owner: 'rltrl#2728'
  },{
    id: 3,
    roomName: '여서오세요:D',
    mode: 1,
    member: [
      {
        createdAt: '2022-11-08T10:45:35.38043',
        modifiedAt: '2022-11-08T10:45:35.38043',
        id: 1,
        email: 'wlstpgns51@naver.com',
        password: 'ABC',
        nickname: 'rltrl#2728',
      },      {
        createdAt: '2022-11-08T10:45:35.38043',
        modifiedAt: '2022-11-08T10:45:35.38043',
        id: 1,
        email: 'wlstpgns51@naver.com',
        password: 'ABC',
        nickname: 'rltrl#2728',
      },      {
        createdAt: '2022-11-08T10:45:35.38043',
        modifiedAt: '2022-11-08T10:45:35.38043',
        id: 1,
        email: 'wlstpgns51@naver.com',
        password: 'ABC',
        nickname: 'rltrl#2728',
      },      {
        createdAt: '2022-11-08T10:45:35.38043',
        modifiedAt: '2022-11-08T10:45:35.38043',
        id: 1,
        email: 'wlstpgns51@naver.com',
        password: 'ABC',
        nickname: 'rltrl#2728',
      },      {
        createdAt: '2022-11-08T10:45:35.38043',
        modifiedAt: '2022-11-08T10:45:35.38043',
        id: 1,
        email: 'wlstpgns51@naver.com',
        password: 'ABC',
        nickname: 'rltrl#2728',
      },      {
        createdAt: '2022-11-08T10:45:35.38043',
        modifiedAt: '2022-11-08T10:45:35.38043',
        id: 1,
        email: 'wlstpgns51@naver.com',
        password: 'ABC',
        nickname: 'rltrl#2728',
      },      {
        createdAt: '2022-11-08T10:45:35.38043',
        modifiedAt: '2022-11-08T10:45:35.38043',
        id: 1,
        email: 'wlstpgns51@naver.com',
        password: 'ABC',
        nickname: 'rltrl#2728',
      },      {
        createdAt: '2022-11-08T10:45:35.38043',
        modifiedAt: '2022-11-08T10:45:35.38043',
        id: 1,
        email: 'wlstpgns51@naver.com',
        password: 'ABC',
        nickname: 'rltrl#2728',
      }

    ],
    owner: 'rltrl#2728'
  },{
    id: 4,
    roomName: '여서오세요:X',
    roomPassword: 'qwer1234',
    mode: 1,
    member: [
      {
        createdAt: '2022-11-08T10:45:35.38043',
        modifiedAt: '2022-11-08T10:45:35.38043',
        id: 1,
        email: 'wlstpgns51@naver.com',
        password: 'ABC',
        nickname: 'rltrl#2728',
      }
    ],
    owner: 'rltrl#2728'
  },
];

  return <div className='sectionRoomList'>
    <a href='#'><div className='arrowBox'>◀</div></a>
    {mock.map(aroom => {
      return <ARoom key={aroom.id} roomInfo={aroom} />
    })}
    <a href='#'><div className='arrowBox'>▶</div></a>
  </div>
  
}

export default RoomList;