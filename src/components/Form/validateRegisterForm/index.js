import React from 'react';
import { reduxForm, Field, submit } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { Form, FormBox, Label, FieldBox, Button, ModalButtonBox, ItemBox } from './style';
import 'react-widgets/dist/css/react-widgets.css';
// FIXME refactor this

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

const RF = props => {
  const handleSubmit = e => {
    e.preventDefault();
    props.dispatch(submit('validateRegisterForm'));
  };
  return (
    <Form onSubmit={handleSubmit}>
      <FormBox>
        <ItemBox>
          <Label>Username</Label>
          <FieldBox>
            <Field name="username" component={Input} />
          </FieldBox>
        </ItemBox>
        <ItemBox>
          <Label>Código:</Label>
          <FieldBox>
            <Field name="code" component={Input} />
          </FieldBox>
        </ItemBox>
      </FormBox>
      <ModalButtonBox>
        <Button onClick={handleSubmit}>Enviar</Button>
      </ModalButtonBox>
    </Form>
  );
};

RF.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const ValidateRegisterForm = reduxForm({
  form: 'validateRegisterForm',
  shouldAsyncValidate: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  onSubmit: (values, _, { actions: { confirmSignUp } }) =>
    confirmSignUp({
      code: values.get('code'),
      username: values.get('username')
    })
})(RF);

export default ValidateRegisterForm;
