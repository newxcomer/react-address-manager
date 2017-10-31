import React, { Component } from 'react';
import { Table, Col, Row, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { listAddress } from '../actions/address-actions';
import { CONSTANTS } from '../constants/constants';

class ListAddress extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      addresses: null
    };
  }

  componentDidMount() {
    let base = this;
    this.props.dispatch(listAddress(function (addresses) {
      base.setState({
        isLoading: false,
        addresses: addresses
      });
    }));
  }

  render () {
    let addresses = [];
    let csvContent = 'data:text/csv;charset=utf-8,';
    let lnkExportToCSV;

    if(!this.state.isLoading) {
      let empty = '', comma = ',';
      this.state.addresses.forEach((address) => {
        var streetName = address.val().StreetName ? address.val().StreetName : empty;
        var ward = address.val().Ward ? address.val().Ward : empty;
        var district = address.val().District ? address.val().District : empty;
        var city = address.val().City ? address.val().City : empty;
        var country = address.val().Country ? address.val().Country : empty;

        csvContent += streetName + comma + ward + comma
          + district + comma + city + comma + country + '\n';
        addresses.push(
          <tr key={address.key}>
            <td>{streetName}</td>
            <td>{ward}</td>
            <td>{district}</td>
            <td>{city}</td>
            <td>{country}</td>
            <td>
              <Link to = { '/address/edit/' + address.key }>{ CONSTANTS.EDIT }</Link>
            </td>
          </tr>
        );
      });
    }
    csvContent = encodeURI(csvContent);

    if(addresses.length > 0) {
      lnkExportToCSV =
        <a className='btn btn-primary' download='list-of-addresses.csv' href={csvContent}>
          { CONSTANTS.EXPORT_TO_CSV }</a>
    }

    const listAddressView =
    this.state.isLoading ? <div className='text-center'>
        <p>{ CONSTANTS.LOADING_DATA }</p>
        <ProgressBar active now={100} />
    </div> : addresses.length === 0 ?
        <div className='text-center'>{ CONSTANTS.EMPTY_ADDRESS }</div>
    :
    <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>{ CONSTANTS.STREET_NAME }</th>
          <th>{ CONSTANTS.WARD }</th>
          <th>{ CONSTANTS.DISTRICT }</th>
          <th>{ CONSTANTS.CITY }</th>
          <th>{ CONSTANTS.COUNTRY }</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{addresses}
      </tbody>
      </Table>;
      return <Row bsClass = 'address-grid container'>
        <h3>Address</h3>
        <Row>
          <Col md={6}>
            <h5><Link to = '/address/add'>+ { CONSTANTS.ADD_NEW_ADDRESS } </Link></h5>
          </Col>
          <Col md={6} className='text-right'>
            { lnkExportToCSV }
          </Col>
        </Row>
          {listAddressView}
        </Row>;
  }
}

export default connect()(ListAddress);
