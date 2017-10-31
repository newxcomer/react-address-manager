import React, { Component } from 'react';
import AddEditAddressView from '../../containers/add-edit-address';
import { CONSTANTS } from '../../constants/constants';

class AddEditAddress extends Component {
  render() {
    // edit mode
    if(this.props.match.params.addressId) {
        let addressId = this.props.match.params.addressId;
        return <AddEditAddressView addressId={addressId} mode={ CONSTANTS.MODE_EDIT } />;
    }
    return <AddEditAddressView mode={ CONSTANTS.MODE_ADD }/>;
  }
};

export default AddEditAddress;
