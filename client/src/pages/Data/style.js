import styled from 'styled-components';

export const CardContainer = styled.div`
  vertical-align: middle;
  position: absolute;
  text-align: center;
  width: 100%;
  height: 90%;
  bottom: 0;
  margin: auto;
  margin-bottom: 0;
  background-color: #cad2d3;
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
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  position: absolute;
  right: 10%;
  bottom: 5%;
  z-index: 5;
  position: fixed;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  text-align: center;
  font-size: 52px;
  color: rgb(0, 255, 148);
`;
