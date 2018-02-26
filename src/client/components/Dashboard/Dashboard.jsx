import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Grid,
  Row,
  Col,
  Button,
  Navbar,
  NavItem,
  Label,
  Nav
} from 'react-bootstrap';

class Dashboard extends Component {
  state = {
    user: null
  };

  componentWillMount() {
    this.getEmailFromToken();
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

    return (
      <Navbar bsStyle="inverse" fluid staticTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">IEstate</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavItem>
            <Navbar.Link onClick={this.logout}>Logout</Navbar.Link>
          </NavItem>
        </Nav>
        <Navbar.Collapse>
          <Navbar.Text>
            Signed in as: <Navbar.Link href="#">{this.state.user}</Navbar.Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Dashboard;
