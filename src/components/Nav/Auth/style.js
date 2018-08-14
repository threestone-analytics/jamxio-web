import styled from 'styled-components';

export const Button = styled.button`
  background: none;
  width: ${props => (props.right ? '85%' : '40%')};
  height: 57px;
  border: none;
  box-shadow: none;
  outline: none;
  color: #000;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 24px;
  text-align: ${props => (props.right ? 'right' : 'center')};
`;
