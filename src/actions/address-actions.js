import { SubmissionError } from 'redux-form';
import addressModel from '../models/address';
import database from '../firebase/firebase';
import { CONSTANTS } from '../constants/constants';

export const listAddress = (callback) => {
  return dispatch => {
    database.ref().child('/' + CONSTANTS.ADDRESSES)
      .on('value', function (snapshot) {
        callback(snapshot);
      });
  };
};

export const addAddress = (methodType, streetName, ward, district, city, country, callback) => {
  return dispatch => {
    database.ref().child('/' + CONSTANTS.ADDRESSES)
      .push(
        addressModel(methodType, streetName, ward, district, city, country))
      .then(() => {
        callback();
      })
      .catch((err) => {
        callback(err);
      });
  };
};

export const updateAddress = (addressId, methodType, streetName, ward, district, city, country, callback) => {
  return dispatch => {
    database.ref().child('/' + CONSTANTS.ADDRESSES + '/' + addressId)
      .update(
        addressModel(methodType, streetName, ward, district, city, country))
      .then(() => {
        callback();
      })
      .catch((err) => {
        callback(err);
      });
  };
};

export const getAddress = (addressId, callback) => {
  return dispatch => {
    let ref = database.ref(CONSTANTS.ADDRESSES);
      ref.orderByKey().equalTo(addressId)
      .on('value', function (snapshot) {
        callback(snapshot);
      });
  };
};

export const getAddressByCenter = (lat, lng, callback) => {
  return dispatch => {
    let url = CONSTANTS.GOOGLE_MAP_GEOCODE_URL;
    url = url.replace('{0}', lat).replace('{1}', lng);
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
    .then( function(response) {
      callback(response);
    });
  };
};

function isRequired(val) {
  return !val || val.trim().length === 0;
}

export const submitAddress = (address, callback) => {
  return dispatch => {
    let msgs = {};
    let tmplMsg = CONSTANTS.TMPL_REQUIRED;

    // Validate submission
    // "street" is always required
    // if "city" is present, then "ward" and "district" are not required
    // if "city" is not present, then both "ward" and "district" are required
    if (isRequired(address.streetName)) {
      msgs.streetName = tmplMsg.replace('{0}', CONSTANTS.STREET_NAME);
    }
    if (isRequired(address.city)) {
      if (isRequired(address.ward)) {
        msgs.ward = tmplMsg.replace('{0}', CONSTANTS.WARD);
      }
      if (isRequired(address.district)) {
        msgs.district = tmplMsg.replace('{0}', CONSTANTS.DISTRICT);
      }
    }
    if (Object.keys(msgs).length > 0)
      throw new SubmissionError(msgs);
    callback(Object.keys(msgs).length === 0);
  };
};
