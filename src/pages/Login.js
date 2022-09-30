import propTypes from 'prop-types';
import React from 'react';
import Load from './Load';
import Trybetunes from '../images/Trybetunes.svg';

class Login extends React.Component {
  render() {
    const { UserName,
      LockButton,
      onInputChange,
      buttonHandler,
      Loading } = this.props;
    return (
      <div data-testid="page-login" id="page-login">
        <img src={ Trybetunes } alt="Trybetunes Logo" />

        {/* <p>Login</p> */}
        {Loading ? (
          <Load />
        ) : (
          <label id="loginBox" htmlFor="login-name-input">
            insira seu nome:
            <br />
            <input
              id="input-username"
              type="text"
              name="UserName"
              data-testid="login-name-input"
              value={ UserName }
              onInput={ onInputChange }
            />
            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={ LockButton }
              onClick={ buttonHandler }
            >
              Entrar
            </button>
          </label>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  UserName: propTypes.string,
  LockButton: propTypes.bool,
  Loading: propTypes.bool,
  Logged: propTypes.bool,
  onInputChange: propTypes.func,
  buttonHandler: propTypes.func,
}.isRrequired;

export default Login;
