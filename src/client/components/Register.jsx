import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  Alert
} from 'react-bootstrap';

class Register extends Component {
  state = {
    username: '',
    password: '',
    error: null,
    isLoggedIn: false
  };

  onUsernameChanged = e => {
    this.setState({
      username: e.target.value
    });
  };

  onPasswordChanged = e => {
    this.setState({
      password: e.target.value
    });
  };

  onRegisterClick = e => {
    const _this = this;
    axios
      .post('/api/register', {
        email: this.state.username,
        password: this.state.password
      })
      .then(function(res) {
        const token = res.data.token;
        localStorage.setItem('token', `bearer ${token}`);
        _this.setState({
          isLoggedIn: true
        });
      })
      .catch(function(err) {
        _this.setState({
          error: err.response.data.error
        });
      });
  };

  onReset = e => {
    this.setState({
      username: '',
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
    const email = this.state.username;
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email) {
      return null;
    }

    return regex.test(email) ? 'success' : 'error';
  }

  clearError = () => {
    this.setState({
      error: null
    });
  };

  render() {
    if (this.state.isLoggedIn) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div>
        <h1 className="es-form-title">ثبت نام</h1>
        {this.state.error && (
          <Alert bsStyle="danger" onDismiss={this.clearError}>
            {this.state.error}
          </Alert>
        )}
        <FormGroup
          controlId="registerEmail"
          validationState={this.getEmailValidateState()}
        >
          <ControlLabel>پست الکترونیکی</ControlLabel>
          <FormControl
            type="text"
            value={this.state.username}
            placeholder="پست الکترونیکی..."
            onChange={this.onUsernameChanged}
          />
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup
          controlId="registerPassword"
          validationState={this.getPasswordValidateState()}
        >
          <ControlLabel>کلمه عبور</ControlLabel>
          <FormControl
            type="password"
            value={this.state.password}
            placeholder="کلمه عبور..."
            onChange={this.onPasswordChanged}
          />
          <FormControl.Feedback />
        </FormGroup>
        <Button block bsStyle="primary" onClick={this.onRegisterClick}>
          ثبت نام
        </Button>
        <Button block bsStyle="link" onClick={this.onReset}>
          پاک سازی
        </Button>
      </div>
    );
  }
}

export default Register;
