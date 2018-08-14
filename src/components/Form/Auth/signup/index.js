import React, { Fragment } from 'react';
import { reduxForm, Field, submit } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import formValidate from 'Utils/validations';

import { Form, FormBox, Label, FieldBox, Button, ModalButtonBox, ItemBox } from '../style';
import 'react-widgets/dist/css/react-widgets.css';

class RF extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.dispatch(submit('registerForm'));
  };

  renderField = ({ input, label, meta: { touched, error, warning }, ...rest }) => (
    <Fragment>
      <label htmlFor={input.name}>
        <input id={input.name} {...input} {...rest} />
        <div style={{ height: '1rem' }}>
          {(touched &&
            (error && <div style={{ color: 'red', fontSize: '14px' }}>Campo Requerido</div>)) ||
            (warning && <div>{rest.warning}</div>)}
        </div>
      </label>
    </Fragment>
  );

  render() {
    const name = {
      name: 'name',
      type: 'text',
      component: this.renderField,
      label: 'name',
      placeholder: 'name',
      disabled: this.props.formState.get('isFetching'),
      maxLength: 20,
      warning: 'Debe tener entre 6-12 caracteres'
    };

    const email = {
      name: 'email',
      type: 'text',
      component: this.renderField,
      label: 'email',
      placeholder: 'email',
      disabled: this.props.formState.get('isFetching'),
      maxLength: 40,
      warning: 'Ingresa un correo valido'
    };
    const institution = {
      name: 'institution',
      type: 'text',
      component: this.renderField,
      label: 'institución',
      placeholder: 'institución',
      disabled: this.props.formState.get('isFetching'),
      maxLength: 20,
      warning: 'Ingresa el nombre de tu institución'
    };

    const institutionType = {
      name: 'institution_type',
      type: 'text',
      component: this.renderField,
      label: 'Tipo de institución',
      placeholder: 'Tipo de Institución',
      disabled: this.props.formState.get('isFetching'),
      maxLength: 12,
      warning: 'Ingresa el nombre del tipo de tu institución'
    };

    const username = {
      name: 'username',
      type: 'text',
      component: this.renderField,
      label: 'username',
      placeholder: 'username',
      disabled: this.props.formState.get('isFetching'),
      maxLength: 12,
      warning: 'Ingresa un nombre de usuario'
    };

    const password = {
      name: 'password',
      type: 'password',
      component: this.renderField,
      label: 'contraseña',
      placeholder: 'contraseña',
      disabled: this.props.formState.get('isFetching'),
      maxLength: 12,
      warning: 'Debe tener entre 8-12 caracteres con al menos 1 número y una letra en miniscula'
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormBox>
          <ItemBox>
            <Label size="20px">Nombre:</Label>
            <FieldBox>
              <Field
                {...name}
                validate={[formValidate.isRequired, formValidate.isUsername]}
                warn={formValidate.isUsername}
              />
            </FieldBox>
          </ItemBox>
          <ItemBox>
            <Label size="20px">e-mail:</Label>
            <FieldBox>
              <Field
                {...email}
                validate={[formValidate.isRequired, formValidate.isEmail]}
                warn={formValidate.isEmail}
              />
            </FieldBox>
          </ItemBox>
          <ItemBox>
            <Label size="20px">Institución:</Label>
            <FieldBox>
              <Field
                {...institution}
                validate={[formValidate.isRequired, formValidate.isCompanyName]}
                warn={formValidate.isCompanyName}
              />
            </FieldBox>
          </ItemBox>
          <ItemBox>
            <Label size="20px">Tipo de Institución:</Label>
            <FieldBox>
              <Field
                {...institutionType}
                validate={[formValidate.isRequired, formValidate.isCompanyName]}
                warn={formValidate.isCompanyName}
              />
            </FieldBox>
          </ItemBox>
        </FormBox>
        <FormBox size="15%">
          <ItemBox>
            <Label size="20px">Usuario:</Label>
            <FieldBox>
              <Field
                {...username}
                validate={[formValidate.isRequired, formValidate.isUsername]}
                warn={formValidate.isUsername}
              />
            </FieldBox>
          </ItemBox>
          <ItemBox>
            <Label size="20px">Contraseña:</Label>
            <FieldBox>
              <Field
                {...password}
                validate={[formValidate.isRequired, formValidate.isPassword]}
                warn={formValidate.isPassword}
              />
            </FieldBox>
          </ItemBox>
        </FormBox>
        <ModalButtonBox>
          <NavLink id="register" to="/">
            <Button onClick={this.handleSubmit}>Enviar</Button>
          </NavLink>
        </ModalButtonBox>
      </Form>
    );
  }
}

RF.propTypes = {
  dispatch: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired
};

const RegisterForm = reduxForm({
  form: 'registerForm',
  shouldAsyncValidate: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  onSubmit: (values, _, { actions: { signUp } }) =>
    signUp({
      username: values.get('username'),
      email: values.get('email'),
      name: values.get('name'),
      password: values.get('password'),
      institution: values.get('institution'),
      institution_type: values.get('institution_type')
    })
})(RF);
export default RegisterForm;
