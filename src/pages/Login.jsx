import React, { Component } from 'react'
import propTypes from 'prop-types';
import LoginPage from '../components/LoginPage/LoginPage'

export default class Login extends Component {
  render() {
    const { history } = this.props;
    return (
      <LoginPage history={ history } />
    )
  }
}

Login.propTypes = {
  history: propTypes.shape({}).isRequired,
}