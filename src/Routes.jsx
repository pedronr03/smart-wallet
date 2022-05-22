import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './pages/Login'
import Wallet from './pages/Wallet'

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/wallet" component={ Wallet } />
        <Route exact path="/" component={ Login } />
      </Switch>
    )
  }
}
