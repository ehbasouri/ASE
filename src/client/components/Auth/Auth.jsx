import React, { Component } from 'react';
import Register from '../Register/Register.jsx';
import Login from '../Login/Login.jsx';
import { Tabs, Tab, Grid, Row, Col } from 'react-bootstrap';
import './Auth.scss';

class Auth extends Component {
  state = {
    isLogin: true
  };

  render() {
    return (
      <Grid className="es-auth">
        <Row>
          <Col xs={12} sm={6} smOffset={3} md={4} mdOffset={4}>
            <Tabs
              justified
              bsStyle="pills"
              defaultActiveKey={1}
              animation={true}
              id="auth-tab"
            >
              <Tab eventKey={1} title="Login">
                <Login />
              </Tab>
              <Tab eventKey={2} title="Register">
                <Register />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Grid>
    );
  }
}

// <Register />
export default Auth;
