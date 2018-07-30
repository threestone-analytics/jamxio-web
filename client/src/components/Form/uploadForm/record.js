import React from 'react';
import 'react-widgets/dist/css/react-widgets.css';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form/immutable';
import { DropdownList } from 'react-widgets/lib';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import PropTypes from 'prop-types';

import {
  Button,
  ModalButtonBox,
  AlertBox,
  Form,
  FormBox,
  Title,
  Alert,
  FieldBox,
  DropzoneBox
} from './style';
import Dropzone from '../../Dropzone';
import AlertText from '../../Alert';

import { validateRecord, createRecord } from './validate';

// Actions
import * as alertActions from '../../../store/reducers/alert/alertActions';
import * as dropzoneActions from '../../../store/reducers/dropzone/dropzoneActions';
import * as validateActions from '../../../store/reducers/form/validateFileForm/validateActions';

// Selectors
import { getDropzone, getAlert } from '../../../utils/selectors/common';

const reduxActions = [alertActions, dropzoneActions, validateActions];

function mapStateToProps(state) {
  return {
    dropzone: getDropzone(state),
    alertState: getAlert(state)
  };
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
    .merge(...reduxActions)
    .filter(value => typeof value === 'function')
    .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

const Input = ({ input, data, valueField, textField }) => (
  <input
    {...input}
    onBlur={() => input.onBlur()}
    value={input.value || []} // requires value to be an array
    data={data}
    valueField={valueField}
    textField={textField}
  />
);

Input.propTypes = {
  input: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  valueField: PropTypes.object.isRequired,
  textField: PropTypes.object.isRequired,
  onChange: PropTypes.object.isRequired
};

const renderDropdownList = ({ input, data, valueField, textField }) => (
  <DropdownList
    {...input}
    data={data}
    valueField={valueField}
    textField={textField}
    onChange={input.onChange}
  />
);

renderDropdownList.propTypes = {
  input: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  valueField: PropTypes.object.isRequired,
  textField: PropTypes.object.isRequired,
  onChange: PropTypes.object.isRequired
};

const dropzone = ({ input, data, valueField, textField, actions, change }) => (
  <Dropzone
    {...input}
    data={data}
    valueField={valueField}
    textField={textField}
    onChange={input.onChange}
    actions={actions}
    change={change}
  />
);

dropzone.propTypes = {
  input: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  change: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  valueField: PropTypes.object.isRequired,
  textField: PropTypes.object.isRequired,
  onChange: PropTypes.object.isRequired
};

const handleRecord = (props, record) => {
  props.handleAddRecord(record);
};

const UF = props => {
  console.log(props.forms);
  const handleSubmit = () => {
    const formData = props.forms.uploadRecordForm;
    const record = createRecord(formData, props.record).then(data => {
      handleRecord(props, data);
      props.handleHide();
    });

    return record;
  };
  return (
    <Form>
      <form onSubmit={handleSubmit}>
        <FormBox>
          <Title big>Categoria:</Title>
          <FieldBox>
            <Field name="category" component={Input} data={['Guitar', 'Cycling', 'Hiking']} />
          </FieldBox>
        </FormBox>
        <FormBox>
          <Title>Subcategoria:</Title>
          <FieldBox>
            <Field name="subcategory" component={Input} data={['Guitar', 'Cycling', 'Hiking']} />
          </FieldBox>
        </FormBox>
        <FormBox>
          <Title>Titulo:</Title>
          <FieldBox>
            <Field name="title" component={Input} data={['Guitar', 'Cycling', 'Hiking']} />
          </FieldBox>
        </FormBox>
        <FormBox>
          <Title>Fuente de los datos:</Title>
          <FieldBox>
            <Field name="source" component={Input} valueField="value" textField="source" />
          </FieldBox>
        </FormBox>
        <FormBox>
          <Title>Typo de geojson:</Title>
          <FieldBox>
            <Field name="geojsonType" component={renderDropdownList} data={['Point', 'Polygon']} />
          </FieldBox>
        </FormBox>
        <AlertBox>
          <Alert blue>Descarga el esquema de datos</Alert>
          <AlertText {...props} />
        </AlertBox>
        <DropzoneBox>
          <Field
            name="file"
            component={dropzone}
            valueField="value"
            textField="file"
            actions={props.actions}
            change={props.change}
          />
        </DropzoneBox>
      </form>
      <ModalButtonBox>
        <Button cancel="true" onClick={props.handleHide}>
          Salir
        </Button>
        <Button onClick={handleSubmit} disabled={!props.valid}>
          Subir
        </Button>
      </ModalButtonBox>
    </Form>
  );
};

UF.propTypes = {
  record: PropTypes.object.isRequired,
  forms: PropTypes.object.isRequired,
  valid: PropTypes.bool.isRequired,
  handleHide: PropTypes.func.isRequired,
  change: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

const UFD = reduxForm({
  form: 'uploadRecordForm',
  validateRecord
})(UF);

const UploadForm = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UFD);

export default UploadForm;
