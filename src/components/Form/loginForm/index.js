import React from 'react';
import { reduxForm, Field, submit } from 'redux-form/immutable';
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
  const handleSubmit = e => {
    e.preventDefault();
    props.dispatch(submit('signInForm'));
    // props.handleHide();
  };
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
        <Button onClick={handleSubmit}>ENTRAR</Button>
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
  dispatch: PropTypes.func.isRequired
};

const LoginForm = reduxForm({
  form: 'signInForm',
  shouldAsyncValidate: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  onSubmit: (values, _, { actions: { signIn }, client: apolloClient }) =>
    signIn({ username: values.get('username'), password: values.get('password'), apolloClient })
})(LF);

export default LoginForm;
