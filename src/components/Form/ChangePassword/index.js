import React from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
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
  const { handleSubmit } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <FormBox>
        <ItemBox>
          <Label>Código de verificacion:</Label>
          <FieldBox>
            <Field name="codigo" component={Input} />
          </FieldBox>
        </ItemBox>
        <ItemBox>
          <Label>Nueva contraseña:</Label>
          <FieldBox>
            <Field name="new_password" component={Input} />
          </FieldBox>
        </ItemBox>
        <ItemBox>
          <Label>Confirmar contraseña:</Label>
          <FieldBox>
            <Field name="confirm_password" component={Input} />
          </FieldBox>
        </ItemBox>
      </FormBox>
      <ModalButtonBox>
        <NavLink id="register" to="/">
          <Button>Reestablecer</Button>
        </NavLink>
      </ModalButtonBox>
    </Form>
  );
};

RF.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const RegisterForm = reduxForm({
  form: 'changePasswordForm' // a unique identifier for this form
})(RF);

export default RegisterForm;
