import { DivSignIn } from './style';

export default function FormSignIn() {
  return (
    <>
      <DivSignIn>
        <div className="divTitleBox">
          <h2>로그인</h2>
        </div>

        <div className="divInpuuBox">
          <input placeholder="  이메일을 입력해주세요."></input>
          <p>이메일이 틀렸습니다.</p>
          <input placeholder="  비밀번호를 입력해주세요."></input>
          <p>비밀번호가 틀렸습니다.</p>
        </div>

        <div className="divButtonBox">
          <button>로그인</button>
          <button>구글로그인</button>
        </div>

        <div className="divSignUpBox">
          <p>아직 라이어게임 참가자가 아니신가요?</p>
          <p>회원가입</p>
        </div>
      </DivSignIn>
    </>
  );
}
