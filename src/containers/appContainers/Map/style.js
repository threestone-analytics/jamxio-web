import styled from 'styled-components';

export const PanelContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 315px;
  max-width: 320px;
  margin: 20px;
  margin-right: 10%;
  margin-top: 100px;
  font-size: 13px;
  line-height: 2;
  outline: none;
  color: #fff;
  vertical-align: middle;
`;

export const Label = styled.div`
  width: 90%;
  display: flex;
  align-content: flex-start;
  vertical-align: middle;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 14px;
  color: #000000;
  text-align: left;
  padding: ${props => (props.sub ? '0px' : '10px')};
`;
