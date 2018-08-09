import React from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
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
  const { handleSubmit } = props;
  return (
    <Form>
      <form onSubmit={handleSubmit}>
        <FormBox>
          <ItemBox>
            <Label>Codigo de verificacion:</Label>
            <FieldBox>
              <Field name="codigo" component={Input} />
            </FieldBox>
          </ItemBox>
          <ItemBox>
            <Label>Nueva contrasena:</Label>
            <FieldBox>
              <Field name="new_password" component={Input} />
            </FieldBox>
          </ItemBox>
          <ItemBox>
            <Label>Confirmar ontrasena:</Label>
            <FieldBox>
              <Field name="confirm_password" component={Input} />
            </FieldBox>
          </ItemBox>
        </FormBox>
        <ModalButtonBox>
          <Button onClick={props.handleHide}>Registrar</Button>
        </ModalButtonBox>
      </form>
    </Form>
  );
};

RF.propTypes = {
  handleHide: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

const RegisterForm = reduxForm({
  form: 'changePasswordForm' // a unique identifier for this form
})(RF);

export default RegisterForm;
