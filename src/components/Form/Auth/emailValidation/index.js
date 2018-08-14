import React, { Fragment } from 'react';
import { reduxForm, Field, submit } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import formValidate from 'Utils/validations';
import { Form, FormBox, Label, FieldBox, Button, ModalButtonBox, ItemBox } from '../style';
import 'react-widgets/dist/css/react-widgets.css';

class EVF extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.dispatch(submit('validateRegisterForm'));
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
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormBox>
          <ItemBox>
            <Label>Username</Label>
            <FieldBox>
              <Field {...username} validate={[formValidate.isRequired]} />
            </FieldBox>
          </ItemBox>
          <ItemBox>
            <Label>Código:</Label>
            <FieldBox>
              <Field {...code} validate={[formValidate.isRequired]} />
            </FieldBox>
          </ItemBox>
        </FormBox>
        <ModalButtonBox>
          <Button disabled={submitting || formState.isFetching} onClick={this.handleSubmit}>
            Enviar
          </Button>
        </ModalButtonBox>
      </Form>
    );
  }
}

EVF.propTypes = {
  dispatch: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired
};

const EmailValidationForm = reduxForm({
  form: 'emailValidationForm',
  shouldAsyncValidate: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  onSubmit: (values, _, { actions: { confirmSignUp } }) =>
    confirmSignUp({
      code: values.get('code'),
      username: values.get('username')
    })
})(EVF);

export default EmailValidationForm;
