import styled from 'styled-components';
export const DivSignIn = styled.div`
  width: 300px;
  height: 350px;
  margin: auto;
  border: 2px solid #d9d9d9;
  background-color: #d9d9d9;
  border-radius: 8px;

  .divTitleBox {
    width: 100%;
    height: 50px;
    font-size: 17px;

    text-align: center;
  }
  .divInpuuBox {
    width: 100%;
    margin-top: 5px;
    text-align: center;

    input {
      width: 80%;
      height: 25px;
      border: none;
      border-radius: 5px;
    }

    p {
      color: #ff0000;
      margin-top: 3px;
      text-align: left;
      margin-left: 35px;
      font-size: 13px;
    }
  }
  .divButtonBox {
    width: 100%;

    text-align: center;

    button {
      width: 80%;
      height: 28px;
      margin-top: 12px;
      border: none;
      border-radius: 5px;
      background-color: #f28686;
      color: white;
    }
  }

  .divSignUpBox {
    width: 100%;
    margin-left: 30px;
    text-align: center;

    margin-top: 5px;
    p {
      font-size: 13px;
      float: left;
    }
  }
`;
