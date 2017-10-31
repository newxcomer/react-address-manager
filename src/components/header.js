import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import '../stylesheets/common.css';
import { CONSTANTS } from '../constants/constants';

const Header = () => (
  <Navbar id='header' inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to='/'>{ CONSTANTS.ADDRESS_MANAGER }</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <IndexLinkContainer to = "/">
          <NavItem eventKey={1}>{ CONSTANTS.HOME }</NavItem>
        </IndexLinkContainer>
        <LinkContainer to = "/address">
          <NavItem eventKey={2}>{ CONSTANTS.MANAGE_ADDRESS }</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header
