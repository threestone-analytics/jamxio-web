import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Image,
  Details,
  Info,
  Buttons,
  Button,
  LabelBox,
  Label,
  ImageContainer
} from './style';

const DataCard = props => {
  const { record } = props;
  const handleOpen = name => {
    props.actions.show(name, { record });
  };
  return (
    <Card>
      <ImageContainer>
        <Image src={record.thumbnail} />
      </ImageContainer>
      <Details>
        <Info>
          <LabelBox>
            Categoria: <Label> {record.documentType.category}</Label>
          </LabelBox>
          <LabelBox>
            Subcategoria: <Label> {record.documentType.subcategory}</Label>
          </LabelBox>
          <LabelBox>
            Titulo: <Label> {record.title}</Label>
          </LabelBox>
        </Info>
        <Buttons>
          <Button onClick={() => handleOpen('historyModal')}>Descargar</Button>
          <Button onClick={() => handleOpen('uploadModal')}>Contribuir</Button>
        </Buttons>
      </Details>
    </Card>
  );
};

DataCard.propTypes = {
  record: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default DataCard;
