import React, { Component } from 'react';
import axios from 'axios';

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
        console.log(res);
      })
      .catch(function(err) {
        console.error(err);
      });
  };

  onReset = e => {
    this.setState({
      username: '',
      password: ''
    });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="email..."
          value={this.state.username}
          onChange={this.onUsernameChanged}
        />
        <input
          type="password"
          placeholder="password..."
          value={this.state.password}
          onChange={this.onPasswordChanged}
        />
        <button onClick={this.onRegisterClick}>Register</button>
        <button onClick={this.onReset}>Reset</button>
      </div>
    );
  }
}

export default Register;
