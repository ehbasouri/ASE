import React from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';

const AppHeader = props => (
  <Navbar bsStyle={props.headerStyle} fluid staticTop>
    <Navbar.Toggle />
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">مشاور من</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Navbar.Collapse>
      <Navbar.Text>
        <Navbar.Link href="#">{props.user}</Navbar.Link>
      </Navbar.Text>
      <Nav>
        <NavItem componentClass="span">
          <Navbar.Link
            style={{ padding: 15, display: 'inline-block' }}
            onClick={props.logout}
          >
            خروج
          </Navbar.Link>
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default AppHeader;
