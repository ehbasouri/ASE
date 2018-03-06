import React from 'react';
import { Navbar, NavItem, Nav, FormGroup, FormControl, Button, InputGroup } from 'react-bootstrap';

const AppHeader = props => (
  <Navbar bsStyle={props.headerStyle} fluid staticTop>
    <Navbar.Toggle />
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">مشاور من</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav style={{ float: 'left' }}>
        <NavItem componentClass="span">
          <Navbar.Link
            style={{ padding: 15, display: 'inline-block' }}
            onClick={props.logout}
          >
            خروج
        </Navbar.Link>
        </NavItem>
      </Nav>
      <Navbar.Form pullLeft>
        <FormGroup>
          <InputGroup>
            <FormControl style={{ background: '#111', color: '#eee', border: 'unset' }} type="text" placeholder="Search" onChange={props.onChange} value={props.query} />
            <InputGroup.Button>
              <Button style={{ background: '#286090', color: '#eee', border: 'unset' }} type="submit" onClick={props.onSearch}>جستجو</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </Navbar.Form>
      <Navbar.Text>
        <Navbar.Link href="#">{props.user}</Navbar.Link>
      </Navbar.Text>
    </Navbar.Collapse>
  </Navbar >
);

export default AppHeader;
