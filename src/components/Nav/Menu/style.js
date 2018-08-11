import styled from 'styled-components';

export const Button = styled.button`
  background: ${props => (props.active ? '#2f80ed' : '#fff')};
  width: 30%;
  height: 57px;
  border: none;
  box-shadow: ${props => (props.active ? 'none' : '0px 4px 6px rgba(0, 0, 0, 0.25)')};
  outline: none;
  color: ${props => (props.active ? '#fff' : '#2f80ed')};
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 24px;
  text-align: center;
`;

export const Buttons = styled.div`
  z-index: 999;
  position: fixed;
  height: 30px;
  left: 36px;
  top: 36px;
`;
