import React, { Fragment } from 'react';
import { reduxForm, Field, submit } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import formValidate from 'Utils/validations';
import { Form, FormBox, Label, FieldBox, Button, ModalButtonBox, ItemBox } from './style';
import 'react-widgets/dist/css/react-widgets.css';

class RF extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.dispatch(submit('changePasswordForm'));
  };

  renderField = ({ input, label, meta: { touched, error, warning }, ...rest }) => (
    <Fragment>
      <label htmlFor={input.name}>
        <input id={input.name} {...input} {...rest} />
        <div style={{ height: '1rem' }}>
          {(touched && (error && <div>Campo Requerido</div>)) ||
            (warning && <div>{rest.warning}</div>)}
        </div>
      </label>
    </Fragment>
  );

  render() {
    const { submitting, formState } = this.props;
    const username = {
      name: 'username',
      type: 'text',
      component: this.renderField,
      label: 'username',
      placeholder: 'username',
      disabled: this.props.formState.get('isFetching'),
      maxLength: 20,
      warning: 'Debe tener entre 6-12 caracteres'
    };

    const code = {
      name: 'code',
      type: 'text',
      component: this.renderField,
      label: 'código',
      placeholder: 'código',
      disabled: this.props.formState.get('isFetching'),
      maxLength: 12,
      warning: ''
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
            <Label>Nombre de usuario</Label>
            <FieldBox>
              <Field {...username} validate={[formValidate.isRequired]} />
            </FieldBox>
          </ItemBox>
          <ItemBox>
            <Label>Código</Label>
            <FieldBox>
              <Field {...code} validate={[formValidate.isRequired]} />
            </FieldBox>
          </ItemBox>
          <ItemBox>
            <Label>Nueva contraseña:</Label>
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
          <Button disabled={submitting || formState.isFetching} onClick={this.handleSubmit}>
            Restablecer
          </Button>
        </ModalButtonBox>
      </Form>
    );
  }
}

RF.propTypes = {
  dispatch: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired
};

const RegisterForm = reduxForm({
  form: 'changePasswordForm',
  shouldAsyncValidate: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  onSubmit: (values, _, { actions: { changePassword } }) =>
    changePassword({
      username: values.get('username'),
      code: values.get('code'),
      password: values.get('password')
    })
})(RF);

export default RegisterForm;
