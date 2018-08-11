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
    props.dispatch(submit('changePasswordForm'));
    // props.handleHide();
  };
  return (
    <Form onSubmit={handleSubmit}>
      <FormBox>
        <ItemBox>
          <Label>Nombre de usuario</Label>
          <FieldBox>
            <Field name="username" component={Input} />
          </FieldBox>
        </ItemBox>
        <ItemBox>
          <Label>Código</Label>
          <FieldBox>
            <Field name="codigo" component={Input} />
          </FieldBox>
        </ItemBox>
        <ItemBox>
          <Label>Nueva contraseña:</Label>
          <FieldBox>
            <Field name="password" component={Input} />
          </FieldBox>
        </ItemBox>
      </FormBox>
      <ModalButtonBox>
        <Button>Reestablecer</Button>
      </ModalButtonBox>
    </Form>
  );
};

RF.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const RegisterForm = reduxForm({
  form: 'changePasswordForm',
  shouldAsyncValidate: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  onSubmit: (values, _, { actions: { changePassword } }) =>
    changePassword({
      username: values.get('username'),
      code: values.get('codigo'),
      password: values.get('password')
    })
})(RF);

export default RegisterForm;
