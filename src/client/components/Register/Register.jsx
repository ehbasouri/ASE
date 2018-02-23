import React, { Component } from 'react';
import axios from 'axios';
import './Register.scss';
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

class Register extends Component {
  state = {
    username: '',
    password: ''
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
    axios
      .post('/register', {
        email: this.state.username,
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
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email) {
      return null;
    }

    return regex.test(email) ? 'success' : 'error';
  }

  render() {
    return (
      <div className="es-container">
        <Grid className="es-register">
          <Row>
            <Col xs={12} sm={6} smOffset={3} md={4} mdOffset={4}>
            <h1 className="es-form-title">Register</h1>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={6} smOffset={3} md={4} mdOffset={4}>
              <FormGroup
                controlId="registerEmail"
                validationState={this.getEmailValidateState()}
              >
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.username}
                  placeholder="Email..."
                  onChange={this.onUsernameChanged}
                />
                <FormControl.Feedback />
              </FormGroup>
              <FormGroup
                controlId="registerPassword"
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
              <Button block bsStyle="primary" onClick={this.onRegisterClick}>
                Register
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

export default Register;
