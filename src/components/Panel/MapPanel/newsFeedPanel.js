import React from 'react';
import PropTypes from 'prop-types';
import {
  NewsFeedContainer,
  NewsFeedItemsContainer,
  PanelHeader,
  FeedPanelItemContainer,
  FeedContent,
  PictureContainer,
  TextContent,
  Image,
  FeedTitle
} from './style';

const ShowItem = props => {
  const { data } = props;

  return (
    <FeedPanelItemContainer>
      <PictureContainer>
        <Image src={data.image} />
      </PictureContainer>
      <FeedContent>
        <a href={data.url} target="_blank" without rel="noopener noreferrer">
          <FeedTitle>{data.author}</FeedTitle>
          <TextContent>{data.title}</TextContent>
        </a>
      </FeedContent>
    </FeedPanelItemContainer>
  );
};
ShowItem.propTypes = {
  data: PropTypes.object.isRequired
};

const NewsPanel = props => {
  const { data } = props;
  return (
    <NewsFeedContainer>
      <PanelHeader>Noticias Recientes</PanelHeader>
      <NewsFeedItemsContainer>{data.map(d => <ShowItem data={d} />)}</NewsFeedItemsContainer>
    </NewsFeedContainer>
  );
};
NewsPanel.propTypes = {
  data: PropTypes.object.isRequired
};
export default NewsPanel;
