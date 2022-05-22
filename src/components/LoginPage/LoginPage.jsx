import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './LoginPage.module.css';
import { login } from '../../redux/actions';
import logo from '../../images/pngwing.com.png';

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  login = (email) => {
    const { history, actionLogin } = this.props;
    actionLogin(email);
    history.push('/wallet');
  }

  verifyInput = (email, password) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;
    const test = regex.test(email);
    const minLength = 6;
    return !(test && password.length >= minLength);
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className={ styles.main }>
        <div className={ styles.leftSide }>
          <div>
            <h1>Welcome!</h1>
            <p>Please enter your details.</p>
          </div>
          <div className={ styles.form }>
            <label htmlFor="email">
              Email
              <input
                type="email"
                data-testid="email-input"
                id="email"
                value={ email }
                onChange={ ({ target }) => this.setState({ email: target.value }) }
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                type="password"
                data-testid="password-input"
                id="password"
                value={ password }
                onChange={ ({ target }) => this.setState({ password: target.value }) }
              />
            </label>
          </div>
          <div>
            <button
              type="button"
              disabled={ this.verifyInput(email, password) }
              onClick={ () => this.login(email) }
            >
              Login
            </button>
          </div>
        </div>
        <div className={ styles.rightSide }>
          <div>
            <img src={ logo } alt="logo" />
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  actionLogin: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  actionLogin: (email) => dispatch(login(email)),
});

const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
