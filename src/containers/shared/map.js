import React, { Component } from 'react';
import { GMap } from './g-map';
import canUseDOM from 'can-use-dom';
import { connect } from 'react-redux';
import { getAddressByCenter } from '../../actions/address-actions';
import { CONSTANTS } from '../../constants/constants';

const geolocation = (
  canUseDOM && navigator.geolocation ?
  navigator.geolocation :
  ({
    getCurrentPosition(success, failure) {
      failure(CONSTANTS.NOT_SUPPORTED_GEOLOCATION);
    },
  })
);

class Map extends Component {

  constructor(props) {
      super(props);
      this.state = {
          isLoadingLocation: true,
          center: {
            lat: CONSTANTS.DEFAULT_CENTER_LAT,
            lng: CONSTANTS.DEFAULT_CENTER_LNG
          },
          content: CONSTANTS.YOUR_CURRENT_LOCATION
      };
  }

  changeState (isLoadingLocation, lat, lng, content) {
    this.setState({
          isLoadingLocation: isLoadingLocation,
          center: {
            lat: lat,
            lng: lng
          },
          content: content
      });
  }

  fillAddressToForm() {
    let base = this;
    this.props.dispatch(getAddressByCenter(this.state.center.lat, this.state.center.lng,
      function (res) {
        if(res.ok) {
          res.json().then(json => {
            let address = {};
            let addressComp = json['results'][0]['address_components'];
            address.streetName = addressComp[0].long_name;
            address.ward = addressComp[2].long_name;
            address.district = addressComp[3].long_name;
            address.city = addressComp[4].long_name;
            address.country = !addressComp[5] ? '' : addressComp[5].long_name;

            base.props.onGotCenter(address);
          });
        }
      }));
  }

  componentDidMount() {
    geolocation.getCurrentPosition((position) => {
      this.changeState(false, position.coords.latitude,
                      position.coords.longitude, CONSTANTS.YOUR_CURRENT_LOCATION);
      this.fillAddressToForm();
    }, (reason) => {
      this.changeState(false, CONSTANTS.DEFAULT_CENTER_LAT, CONSTANTS.DEFAULT_CENTER_LNG,
                      CONSTANTS.GEOLOCATION_FAILED + ' ' + reason);
    });
  }

  render() {
    let map = CONSTANTS.LOADING_MAP;
    if(!this.state.isLoadingLocation) {
      map = <GMap
          containerElement={
            <div style={{ height: `300px`, marginBottom: `15px` }} />
          }
          mapElement={
            <div style={{ height: `300px` }} />
          }

          center = { this.state.center }
          content = { this.state.content }
      />;
    }
    return <div>{map}</div>;
  }
}

export default connect()(Map);
