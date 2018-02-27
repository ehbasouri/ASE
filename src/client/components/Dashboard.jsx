import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AppHeader from './AppHeader.jsx';
import EstateList from './EstateList.jsx';
import axios from 'axios';

class Dashboard extends Component {
  state = {
    user: null,
    estates: []
  };

  componentWillMount() {
    this.getEmailFromToken();
  }

  componentDidMount() {
    this.getEstates();
  }

  getEstates() {
    const _this = this;
    axios('/api/estates', {
      headers: {
        Authorization: _this.token
      }
    })
      .then(res => {
        _this.setState({
          estates: res.data.estates
        });
      })
      .catch(err => {
        console.warn(err);
      });
  }

  getEmailFromToken() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const rawToken = token.split(' ')[1];
        const b64Payload = rawToken.split('.')[1];
        const strPayload = atob(b64Payload);
        const payload = JSON.parse(strPayload);
        const email = payload.email;
        this.setState({
          user: email
        });
        this.token = token;
      } catch (e) {
        console.warn('Token Invalid ', e);
        this.logout();
      }
    } else {
      this.logout();
    }
  }

  logout = () => {
    localStorage.removeItem('token');
    this.setState({
      user: null
    });
  };

  render() {
    if (!this.state.user) {
      return <Redirect to="/login" />;
    }

    console.log(this.state.estates);
    return (
      <div>
        <AppHeader
          user={this.state.user}
          headerStyle="inverse"
          logout={this.logout}
        />
        <EstateList estates={this.state.estates} />
      </div>
    );
  }
}

export default Dashboard;
