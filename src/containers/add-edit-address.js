import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import AddressFormView from './address-form';
import { connect } from 'react-redux';
import { addAddress, updateAddress } from '../actions/address-actions';
import { CONSTANTS } from '../constants/constants';

export default connect()(class AddEditAddressView extends Component {

  getDefaultValue(address, fieldName, defaultValue) {
    return !address[fieldName] ? defaultValue : address[fieldName];
  }

  createAddress = (address, successCallback, failedCallback) => {
    let base = this;
    const empty = '';
    base.props.dispatch(addAddress(
      base.getDefaultValue(address, CONSTANTS.FIELD_METHOD_TYPE_NAME,
                          CONSTANTS.METHOD_TYPE_NORMAL_VALUE),
      base.getDefaultValue(address, CONSTANTS.FIELD_STREET_NAME, empty),
      base.getDefaultValue(address, CONSTANTS.FIELD_WARD_NAME, empty),
      base.getDefaultValue(address, CONSTANTS.FIELD_DISTRICT_NAME, empty),
      base.getDefaultValue(address, CONSTANTS.FIELD_CITY_NAME, empty),
      base.getDefaultValue(address, CONSTANTS.FIELD_COUNTRY_NAME, empty),
      function (err) {
        if (!err) {
          successCallback();
        } else {
          failedCallback();
        }
      }
    ));
  }

  editAddress = (addressId, address, successCallback, failedCallback) => {
    let base = this;
    base.props.dispatch(updateAddress(
      addressId,
      address.methodType,
      address.streetName,
      address.ward,
      address.district,
      address.city,
      address.country,
      function (err) {
        if (!err) {
          successCallback();
        } else {
          failedCallback();
        }
      }
    ));
  }

  render () {
    let headerLabel = CONSTANTS.EDIT;
    let headerCaption;

    if(this.props.mode === CONSTANTS.MODE_ADD) {
      headerLabel = CONSTANTS.CREATE_NEW;
      headerCaption = <p>{ CONSTANTS.CREATE_CAPTION }</p>;
    }

    return <Row bsClass = 'container'>
      <h3>{headerLabel} { CONSTANTS.ADDRESS }</h3>
      { headerCaption }
      <AddressFormView mode={this.props.mode} addressId={this.props.addressId}
        onCreate = { this.createAddress }
        onEdit = { this.editAddress }/>
    </Row>;
  }
});
