import React from 'react';
import { Navbar, NavItem, Nav, FormGroup, FormControl, Button } from 'react-bootstrap';

const AppHeader = props => (
  <Navbar bsStyle={props.headerStyle} fluid staticTop>
    <Navbar.Toggle />
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">مشاور من</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Navbar.Collapse>
      <Navbar.Form pullLeft>
        <FormGroup>
          <FormControl type="text" placeholder="Search" onChange={props.onChange} value={props.query}/>
        </FormGroup>
        <Button type="submit" onClick={props.onSearch}>جستجو</Button>
      </Navbar.Form>
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
