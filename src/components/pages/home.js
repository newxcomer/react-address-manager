import React from 'react';
import { Row, Well } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CONSTANTS } from '../../constants/constants';

const Home = () => (
  <Row bsClass = 'container'>
    <Well bsSize='large'>
      <h3>{ CONSTANTS.WELCOME_ADDRESS_APP }</h3>
      <p>{ CONSTANTS.HOME_DESC1 }</p>
      <p>{CONSTANTS.HOME_DESC21} <Link to = '/address'>{CONSTANTS.HOME_DESC22}</Link> { CONSTANTS.HOME_DESC23 }.</p>
    </Well>
  </Row>
);

export default Home
