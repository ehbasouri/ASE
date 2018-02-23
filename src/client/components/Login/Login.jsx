import React, { Component } from 'react';
import axios from 'axios';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button,
  Grid,
  Row,
  Col
} from 'react-bootstrap';

class Login extends Component {
  state = {
    email: '',
    password: ''
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
    axios
      .post('/login', {
        email: this.state.email,
        password: this.state.password
      })
      .then(function(res) {
        console.log(res.data.email);
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
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email) {
      return null;
    }

    return regex.test(email) ? 'success' : 'error';
  }

  render() {
    return (
      <div className="es-container">
        <Grid className="es-login">
          <Row>
            <Col xs={12} sm={6} smOffset={3} md={4} mdOffset={4}>
            <h1 className="es-form-title">Login</h1>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={6} smOffset={3} md={4} mdOffset={4}>
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
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Login;
