
import Router from './shared/Router';
import VideoRoomComponent from 'openvidu-react/dist/components/VideoRoomComponent';
import registerServiceWorker from './registerServiceWorker';

function App() {
  return (
  <>
  <VideoRoomComponent openviduServerUrl='https://cheiks.shop'/>
    {/* <Router /> */}
  </>
  );
}

export default App;
registerServiceWorker();