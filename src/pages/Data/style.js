import styled from 'styled-components';

export const CardContainer = styled.div`
  vertical-align: middle;
  position: absolute;
  text-align: center;
  width: 100%;
  height: 91%;
  bottom: 0;
  margin: auto;
  margin-bottom: 0;
  background-color: #f0f0f0;
  overflow-y: scroll;
`;

export const TopBar = styled.div`
  text-align: center;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  position: absolute;
  width: 100%;
  height: 85px;
  left: 0%;
  right: 0%;
  top: 0%;
  z-index: 5;
  position: fixed;
`;

export const AddRecordButton = styled.div`
  text-align: center;
  background: #2f80ed;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.35);
  position: absolute;
  right: 10%;
  bottom: 5%;
  z-index: 5;
  position: fixed;
  width: 70px;
  height: 70px;
  line-height: 70px;
  border-radius: 35px;
  text-align: center;
  font-size: 52px;
  color: #ffffff;
`;
