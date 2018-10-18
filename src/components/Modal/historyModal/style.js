import styled from 'styled-components';

export const Button = styled.button`
  background: ${props => (props.disabled ? '#000' : props.cancel ? '#FF5A5F' : '#00FF94')};
  border: none;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 18px;
  text-align: center;
  height: 40px;
  width: 150px;
  color: #fff;
`;

export const Input = styled.input`
  order: 1;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  font-size: 24px;
  color: #000000;
  margin: 15px;
`;

export const ModalBox = styled.div`
  width: 850px;
  height: 700px;
  left: 261px;
  top: 263px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 35px;
`;

export const SpinnerBox = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const ModalLabelBox = styled.div`
  background-color: white;
  order: 0;
  margin-left: 5%;
  height: 20%;
  width: 60%;
  display: flex;
  flex-direction: ${props => (props.vertical ? 'column' : 'row')};
`;

export const ButtonBox = styled.div`
  margin-top: 5%;
  order: 1;
  height: 50px;
  width: 40%;
  display: flex;
  margin-left: 47%;
  align-items: center;
  justify-content: space-between;
`;

export const BottomContainer = styled.div`
  order: 4;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
export const AlertBox = styled.div`
  order: 2;
  height: 30px;
  width: 40%;
  margin-left: 47%;
  align-items: right;
  justify-content: flex-end;
  display: none;
  ${BottomContainer}:hover & {
    display: ${props => (props.disabled ? 'none' : 'flex')};
  }
`;

export const ModalOuter = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalInfo = styled.div`
  background-color: white;
  padding: auto;
  order: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  align-content: space-between;
  margin-top: 30px;
`;

export const Title = styled.h1`
  order: 0;
  font-family: 'Roboto', sans-serif;
  text-align: ${props => (props.right ? 'right' : 'left')};
  color: ${props => (props.color ? props.color : '#000')};
  font-style: normal;
  font-weight: ${props => (props.thin ? 'normal' : 'bold')};
  line-height: normal;
  font-size: ${props => (props.big ? '16px' : '15px')};
  margin: 5px;
  margin-right: ${props => (props.margin_right ? props.margin_right : '0px')};
  text-decoration: ${props => (props.underline ? 'underline' : 'none')};
`;

export const Label = styled.h1`
  order: 0;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: ${props => (props.thin ? 'normal' : 'bold')};
  line-height: normal;
  font-size: ${props => (props.big ? '20px' : '18px')};
  color: #000000;
  margin-right: ${props => (props.margin_right ? props.margin_right : '0px')};
  margin-right: 10px;
`;

export const Alert = styled.a`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: bold;
  cursor: pointer;
  font-size: 15px;
  text-decoration: underline;
  &:hover {
    color: #2f80ed;
  }
`;

export const HistoryContainer = styled.div`
  background-color: white;
  order: 2;
  height: 60%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HistoryBox = styled.div`
  background-color: white;
  order: 2;
  height: 100%;
  width: 90%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;

export const HistoryInfoTab = styled.div`
  background-color: white;
  order: 0;
  bottom: 0;
  margin-top: 3%;
  height: 7%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(120, 103, 103, 0.51);
`;

export const HistoryItemContainer = styled.div`
  background-color: white;
  height: 100%;
  width: 100%;
  border-bottom: 1px solid rgba(120, 103, 103, 0.51);
  flex-direction: column;
  overflow-y: scroll;
  max-height: 400px;
`;

export const HistoryItem = styled.div`
  margin-top: 10px;
  height: 37px;
  flex-direction: row;
  display: flex;
  width: 100%;
  background-color: ${props => (props.color ? props.color : 'white')};
  border-bottom: 1px solid rgba(120, 103, 103, 0.11);
`;

export const CheckBox = styled.input`
  width: 10%;
  margin: auto;
`;

export const Date = styled.div`
  vertical-align: middle;
  padding: 10px 0;
  width: 25%;
`;

export const User = styled.div`
  color: ${props => (props.color ? props.color : '#2f80ed')};
  text-decoration: underline;
  padding: 10px 0;
  width: 48%;
`;

export const DataType = styled.div`
  padding: 10px 0;
  width: 15%;
`;

export const HistoryItemBox = styled.div`
  background-color: white;
  height: 100%;
  width: ${props => (props.width ? props.width : '10%')};
  display: flex;
  justify-content: flex-start;
  vertical-align: middle;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  font-size: 14px;
  color: #000000;
`;

export const DropzoneBox = styled.div`
  width: 100%;
  order: 1;
  height: 30%;
  left: 15px;
`;
