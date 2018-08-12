import React, { Fragment } from 'react';
import { reduxForm, Field, submit } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import formValidate from 'Utils/validations';
import { Form, FormBox, Label, FieldBox, Button, ModalButtonBox, ItemBox } from '../style';
import 'react-widgets/dist/css/react-widgets.css';

class RF extends React.Component {
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
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormBox>
          <ItemBox>
            <Label>Username:</Label>
            <FieldBox>
              <Field
                {...username}
                validate={[formValidate.isRequired, formValidate.isUsername]}
                warn={formValidate.isUsername}
              />
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

RF.propTypes = {
  dispatch: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired
};

const RegisterForm = reduxForm({
  form: 'validateRegisterForm',
  shouldAsyncValidate: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  onSubmit: (values, _, { actions: { resetPassword } }) =>
    resetPassword({
      username: values.get('username')
    })
})(RF);

export default RegisterForm;
