import validate from 'validate.js';

const isRequired = value => (value ? undefined : 'auth.form.warning.isRequired');
const isEmail = value => {
  const emailConstraints = {
    from: {
      email: true
    }
  };
  return validate({ from: value }, emailConstraints) ? 'auth.form.warning.email' : undefined;
};
const isPassword = value => {
  const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
  const passwordConstraints = {
    password: {
      format: {
        pattern: passwordPattern,
        flags: 'i'
      }
    }
  };
  return validate({ password: value }, passwordConstraints)
    ? 'auth.form.warning.password'
    : undefined;
};

const isUsername = value => {
  const usernamePattern = /^[a-zA-Z0-9]{6,12}$/;
  const usernameConstraints = {
    username: {
      format: {
        pattern: usernamePattern,
        flags: 'i'
      }
    }
  };
  return validate({ username: value }, usernameConstraints)
    ? 'auth.form.warning.password'
    : undefined;
};

const isSamePassword = (value, allValues) => {
  const password = allValues.get('password') || '';
  const passwordAgainConstraints = {
    confirmPassword: {
      equality: 'password'
    }
  };
  return validate(
    {
      password,
      confirmPassword: value
    },
    passwordAgainConstraints
  )
    ? 'auth.form.warning.passwordAgain'
    : undefined;
};

const isCompanyName = value => {
  const companyNamePattern = /^[a-zA-Z., -]+$/;
  const companyNameConstraints = {
    companyName: {
      format: {
        pattern: companyNamePattern,
        flags: 'i'
      }
    }
  };
  return validate({ companyName: value }, companyNameConstraints)
    ? 'auth.form.warning.companyName'
    : undefined;
};

export default { isRequired, isPassword, isEmail, isUsername, isSamePassword, isCompanyName };
