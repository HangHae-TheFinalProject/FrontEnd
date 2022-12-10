import useInput from '../../hooks/useInput';
import { ReactComponent as CancelBtn } from '../../images/svg/icCancel.svg';
import './style.scss';

function SettingBoard({ setOpenSettingModal }) {
  const [gameBGM, gameBGMHandler] = useInput('1');
  return (
    <div className="settingBoardFrame fontLightBold">
      <CancelBtn
        className="settingBoardCloseBtn"
        onClick={() => setOpenSettingModal(false)}
      />
      <span>설정</span>
      <div className="settingCheckBox">
        <div className="settingRadioBtn">
          <span>배경음</span>
          <label
            className={`btn ${gameBGM === '1' ? 'active' : ''} fontSemiBold`}
          >
            <input
              id="radio"
              type="radio"
              name="gameBGM"
              value={1}
              onChange={gameBGMHandler}
              checked={gameBGM === '1'}
            />
            <p>켜기</p>
          </label>
          <label
            className={`btn ${gameBGM === '2' ? 'active' : ''} fontSemiBold`}
          >
            <input
              id="radio"
              type="radio"
              name="gameBGM"
              value={2}
              onChange={gameBGMHandler}
              checked={gameBGM === '2'}
            />
            <p>끄기</p>
          </label>
        </div>
      </div>
    </div>
  );
}
export default SettingBoard;
