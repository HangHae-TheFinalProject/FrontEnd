import { ReactComponent as CancelBtn } from '../../images/svg/icCancel.svg';
import './style.scss';

function GameRuleBoard({ setOpenGameRuleModal }) {
  return (
    <div className="gameRuleBoard fontBold">
      <CancelBtn
        className="gameRuleBoardCloseBtn"
        onClick={() => setOpenGameRuleModal(false)}
      />
      <div className="gameScenario">
        [ 게임 진행 ]
        <div className="gameScenarioSteps">
          <p>
            <span className="gameSceneNumber">#1</span>
            게임방에 입장합니다.
          </p>
          <p>
            <span className="gameSceneNumber">#2</span>
            게임 인원이 최소 3명은 되어야 플레이가 가능합니다!
          </p>
          <p>
            <span className="gameSceneNumber">#3</span>
            방장이 게임시작을 클릭, 참가하신 모든 플레이어는 게임준비를 합니다.
          </p>
          <p>
            <span className="gameSceneNumber">#4</span>
            모두 준비가 완료되면 타이머가 돌아가고 첫 번째 유저에게
            스포트라이트!
            <p className="gameSceneSecondParagraph">
              참가자 전원에게 발언 기회가 돌아갑니다.
            </p>
          </p>
          <p>
            <span className="gameSceneNumber">#5</span>
            모두의 발언이 끝나고 방장은 한 바퀴 더 또는 바로 투표를 할 수
            있습니다.
            <p className="gameSceneSecondParagraph">
              방장은 모두의 의견을 받아 선택을 하면 됩니다.
            </p>
          </p>
          <p>
            <span className="gameSceneNumber">#5-A</span>한 바퀴 더 : 한 바퀴 더
            진행합니다! 최대 세 바퀴 진행 가능
          </p>
          <p>
            <span className="gameSceneNumber">#5-A</span>
            바로 투표 : 라이어를 찾는 투표를 진행합니다!
          </p>
          <p>
            <span className="gameSceneNumber">#6</span>
            투표로 지목된 유저가 라이어가 맞다면?!
            <p className="gameSceneSecondParagraph">
              라이어는 시민들에게 얻은 힌트로 키워드를 맞추고
            </p>
          </p>
          <p>
            <span className="gameSceneNumber">#6-A</span>
            라이어가 키워드를 맞추면
            <span className="lier">라이어</span>의 승리!
          </p>
          <p>
            <span className="gameSceneNumber">#6-B</span>
            라이어가 키워드를 틀리면
            <span className="civil">시민</span>의 승리!
          </p>
          <p>
            <span className="gameSceneNumber">#7</span>
            투표로 지목된 유저가 라이어가 아니라면?!
            <p className="gameSceneSecondParagraph">
              <span className="lier">라이어</span>의 승리로 게임이 종료됩니다.
            </p>
          </p>
        </div>
      </div>
      <div className="gameModeTip">
        [ 일반 모드 ]
        <div className="normalModeTip">
          <p>
            # 시민과 라이어 모두 공통된 카테고리를 받고 <br />
            <span className="civil">시민</span>
            들은 카테고리에 대한 키워드를, <br />
            <span className="lier">라이어</span>는 당신은 라이어입니다.를 안내
            받습니다.
          </p>
        </div>
        [ 바보 모드 ]
        <div className="foolModeTip">
          <p>
            # 시민과 라이어 모두 공통된 카테고리를 받고, <br />
            <span className="lier">라이어</span>는{' '}
            <span className="civil">시민</span>
            들과(혼자만) 다른 키워드를 받습니다.
          </p>
        </div>
        [ 게임 Tip ]
        <div className="foolModeTip">
          <p>
            # 스포트라이트는 10초의 발언 기회가 주어지며,
            <br />
            다른 참가자는 마이크가 음소거 됩니다.
            <br />
            주어진 10초 동안 자신의 키워드를 설명해주세요!
          </p>
          <p>
            # <span className="civil">시민</span>은 라이어에게 키워드를 쉽게
            들키지 않도록 설명해주세요!
          </p>
          <p>
            # <span className="lier">라이어</span>는 시민들의 힌트를 얻어 본인의
            정체를 들키지 않아야 합니다!
          </p>
          <p># 카메라와 마이크를 사용 할 수 있어야 입장이 가능합니다.</p>
          <p>
            # 혹시나 카메라가 부담스러우신가요?
            <br /> 입장 후 채팅 창 하단에 카메라와 마이크를 on/off 할 수
            있습니다.
            <br /> 카메라를 끄게되면 랜덤으로 부여된 캐릭터를 보여줍니다!
          </p>
        </div>
      </div>
    </div>
  );
}

export default GameRuleBoard;
