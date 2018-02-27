import React, { Component } from 'react';
import Register from './Register.jsx';
import Login from './Login.jsx';
import { Tabs, Tab, Grid, Row, Col } from 'react-bootstrap';

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
              <Tab eventKey={1} title="ورود">
                <Login />
              </Tab>
              <Tab eventKey={2} title="ثبت نام">
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
