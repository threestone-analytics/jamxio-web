import styled from 'styled-components';

export const ModalBox = styled.div`
  width: 722px;
  height: 581px;
  left: 261px;
  top: 263px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  width: 100%;
  height: 200px;
  top: 0;
  background: #2f80ed;
  display: flex;
  flex-direction: row;
`;

export const ModalOuter = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalInfo = styled.div`
  background-color: white;
  padding: auto;
  order: 0;
  height: 25%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  align-content: space-between;
  margin-top: 30px;
`;
