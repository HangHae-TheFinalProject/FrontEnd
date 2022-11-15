import styled from 'styled-components';
export const DivSignUp = styled.div`
  width: 300px;
  height: 350px;
  margin: auto;
  border: 2px solid #d9d9d9;
  background-color: #d9d9d9;
  border-radius: 8px;

  .divTitleBox {
    width: 100%;
    height: 35px;
    font-size: 17px;
    text-align: center;
    h2 {
      font-size: 25px;
    }
  }

  .divInputBox {
    width: 100%;
    height: 80px;
    margin-top: 5px;
    text-align: right;

    p {
      font-size: 15px;
    }

    input {
      width: 65%;
      height: 25px;
      border: none;
      border-radius: 5px;
      margin-top: 15px;
      margin-right: 12px;
    }
  }

  .divInputPassword {
    width: 100%;
    height: 90px;
    text-align: right;
    margin-top: 10px;

    input {
      width: 65%;
      height: 25px;
      margin-top: 15px;
      border: none;
      border-radius: 5px;
      margin-right: 12px;
    }
    p {
      color: #ff0000;
      margin-top: 3px;
      text-align: right;
      margin-right: 50px;
      font-size: 13px;
    }
    label {
      font-size: 14px;
    }
  }

  .divSignUpBox {
    width: 100%;
    text-align: center;
    button {
      margin-top: 30px;
      width: 90%;
      height: 35px;
      border: none;
      border-radius: 5px;
      background-color: #f28686;
      color: white;
    }
    p {
      font-size: 13px;
      float: left;
      margin-left: 30px;
    }
  }
`;
