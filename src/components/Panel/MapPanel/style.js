import styled from 'styled-components';

export const GeoDataContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 301px;
  max-width: 320px;
  margin: 20px;
  margin-right: 10%;
  margin-top: 100px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
  font-size: 13px;
  line-height: 2;
  outline: none;
  color: #fff;
  vertical-align: middle;
`;
export const PanelHeader = styled.h5`
  width: 100%;
  height: 40px;
  position: relative;
  text-transform: uppercase;
  top: 0;
  padding: 10px;
  background: rgb(47, 128, 237);
  box-sizing: border-box;
  margin-bottom: 0;
  border: none;
  color: #fff;
`;
export const PanelItemContainer = styled.div`
  width: 100%;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.79);
  box-sizing: border-box;
  border: none;
  border-bottom: 1px;
  display: flex;
  align-content: flex-start;
  vertical-align: middle;
  border: 0.5px solid #ffffff;
`;
export const CrowdSourcedContainer = styled.div`
  position: relative;
  width: 300px;
  max-width: 320px;
  margin-top: 30px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
  font-size: 13px;
  line-height: 2;
  color: #000;
  outline: none;
  vertical-align: middle;
`;
export const NewsFeedContainer = styled.div`
  position: absolute;
  width: 300px;
  margin-top: 30px;
  max-width: 320px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
  font-size: 13px;
  line-height: 2;

  margin-right: 15px;
  color: #000;
  outline: none;
  vertical-align: middle;
  overflow: hidden;
`;

export const NewsFeedItemsContainer = styled.div`
  max-width: 300px;
  overflow-y: scroll;
  max-width: 320px;
  max-height: 250px;
  width: 100%;
  height: 100%;
  padding-right: 17px;
  box-sizing: content-box;
`;

export const FeedPanelItemContainer = styled.div`
  width: 105%;
  height: 90px;
  background-color: rgba(255, 255, 255, 0.79);
  border: none;
  border-bottom: 1px;
  display: flex;
  align-content: flex-start;
  vertical-align: middle;
  border: 0.5px solid #ffffff;
`;

export const PictureContainer = styled.div`
  position: relative;
  width: 30%;
  height: 100%;
  display: block;
  overflow: hidden;
  padding: 5px;
`;

export const Image = styled.img`
  position: absolute;
  margin: 5px;
  width: 60px;
  height: 60px;
  background-color: #fff;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
  display: block;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
  border-radius: 50%;
`;

export const FeedContent = styled.div`
  position: relative;
  width: 70%;
  margin-left: 15px;
  margin-top: 10px;
  height: 95%;
`;

export const CheckBox = styled.div`
  width: 10%;
  margin: auto;
`;
export const Label = styled.div`
  width: 90%;
  display: flex;
  align-content: flex-start;
  vertical-align: middle;
  padding: 10px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 14px;
  color: #000000;
  text-align: left;
`;

export const FeedTitle = styled.div`
  width: 90%;
  display: flex;
  align-content: flex-start;
  vertical-align: middle;
  padding-top: 10px;
  padding-bottom: 2px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  font-size: 14px;
  color: #000000;
  text-align: left;
  overflow: hidden;
  height: 30px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TextContent = styled.div`
  width: 90%;
  height: 33%;
  display: flex;
  align-content: flex-start;
  vertical-align: middle;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  text-align: left;
  line-height: normal;
  font-size: 13px;
  color: #000000;
  overflow: hidden;
  text-overflow: ellipsis;
`;
