import React, { Component } from 'react';
import axios from 'axios';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  state = {
    email: '',
    password: '',
    isLoggedIn: false
  };

  onEmailChanged = e => {
    this.setState({
      email: e.target.value
    });
  };

  onPasswordChanged = e => {
    this.setState({
      password: e.target.value
    });
  };

  loginClick = e => {
    const _this = this;
    axios
      .post('/api/login', {
        email: this.state.email,
        password: this.state.password
      })
      .then(function(res) {
        _this.setState({
          isLoggedIn: true
        });
        console.log(res.data.token);
      })
      .catch(function(err) {
        console.error(err.response);
      });
  };

  onReset = e => {
    this.setState({
      email: '',
      password: ''
    });
  };

  getPasswordValidateState() {
    const length = this.state.password.length;
    if (length > 5) return 'success';
    else if (length > 0) return 'error';
    return null;
  }

  getEmailValidateState() {
    const email = this.state.email;
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email) {
      return null;
    }

    return regex.test(email) ? 'success' : 'error';
  }

  render() {
    if (this.state.isLoggedIn) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div className="es-login">
        <h1 className="es-form-title">Login</h1>
        <FormGroup
          controlId="loginEmail"
          validationState={this.getEmailValidateState()}
        >
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="text"
            value={this.state.email}
            placeholder="Email..."
            onChange={this.onEmailChanged}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup
          controlId="loginPassword"
          validationState={this.getPasswordValidateState()}
        >
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={this.state.password}
            placeholder="Password..."
            onChange={this.onPasswordChanged}
          />
          <FormControl.Feedback />
        </FormGroup>
        <Button block bsStyle="primary" onClick={this.loginClick}>
          Login
        </Button>
        <Button block bsStyle="link" onClick={this.onReset}>
          Reset
        </Button>
      </div>
    );
  }
}

export default Login;
