import React, { Component } from 'react';
import Register from '../Register/Register.jsx';
import Login from '../Login/Login.jsx';

class Auth extends Component {
  state = {
    isLogin: true
  };

  render() {
    return <div>{this.state.isLogin ? <Login /> : <Register />}</div>;
  }
}

// <Register />
export default Auth;
