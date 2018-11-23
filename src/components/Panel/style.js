import styled from 'styled-components';

export const Space = styled.div`
  height: 57px;
  width: 100%;
`;
export const PanelContainer = styled.div`
  position: relative;
  top: 0;
  right: 0;
  width: 315px;
  max-width: 320px;
  font-size: 13px;
  line-height: 2;
  outline: none;
  color: #fff;
  vertical-align: middle;
  z-index: ${props => (props.first ? '98' : props.second ? '97' : '96')};
  overflow: visible;
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
export const PanelHeader = styled.h5`
  width: 300px;
  height: 40px;
  position: relative;
  text-transform: uppercase;
  top: 0;
  padding: 10px;
  background: rgb(47, 128, 237);
  box-sizing: border-box;
  margin-bottom: 0;
  border: none;
`;
export const PanelItemContainer = styled.div`
  width: 315px;
  height: 40px;
  box-sizing: border-box;
  border: none;
  display: flex;
  align-content: flex-start;
  vertical-align: middle;
`;
