import React from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import { NavLink } from 'react-router-dom';
import 'react-widgets/dist/css/react-widgets.css';
import PropTypes from 'prop-types';
import {
  Button,
  ModalButtonBox,
  RegisterButton,
  ItemBox,
  Form,
  FormBox,
  Label,
  FieldBox
} from './style';

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

const LF = props => {
  const { handleSubmit } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <FormBox>
        <ItemBox>
          <Label>Usuario:</Label>
          <FieldBox>
            <Field name="username" component={Input} />
          </FieldBox>
        </ItemBox>
        <ItemBox>
          <Label>Contraseña:</Label>
          <FieldBox>
            <Field name="password" component={Input} />
          </FieldBox>
        </ItemBox>
      </FormBox>
      <ModalButtonBox>
        <Button onClick={props.handleHide}>ENTRAR</Button>
      </ModalButtonBox>
      <ModalButtonBox>
        <NavLink id="register" to="/register">
          <RegisterButton>¿No tienes cuenta? Regístrate</RegisterButton>
        </NavLink>
        <NavLink id="register" to="/reset_password">
          <RegisterButton>¿Olvidaste tu contraseña?</RegisterButton>
        </NavLink>
      </ModalButtonBox>
    </Form>
  );
};
LF.propTypes = {
  handleHide: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

const LoginForm = reduxForm({
  form: 'loginForm' // a unique identifier for this form
})(LF);

export default LoginForm;
