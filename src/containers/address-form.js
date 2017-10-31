import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import formField from './shared/form-input-field';
import formMethodTypeField from './shared/form-method-type-field';
import { getAddress, submitAddress } from '../actions/address-actions';
import Map from './shared/map';
import { CONSTANTS } from '../constants/constants';
import ModalDialog from './shared/modal-dialog';

class AddressFormView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShownMap: false,
      isFirstTime: true,
      isShowModal: false,
      modalContent: '',
      btnLabel: ''
    };
  }

  implementAction () {
    this.props.history.push('/address');
  }

  closeDialog () {
    this.setState({
      isShowModal: false
    });

    if(this.props.mode === CONSTANTS.MODE_ADD) {
      this.resetForm();
    }
  }

  resetForm () {
    let empty = '';

    this.setState({
      isShownMap: false
    });

    this.props.initialize({
      'methodType': CONSTANTS.METHOD_TYPE_NORMAL_VALUE,
      'streetName': empty,
      'ward': empty,
      'district': empty,
      'city': empty,
      'country': empty
    });
  }

  handleInitialize() {
    let base = this;
    let modalContent = CONSTANTS.ADD_ADDRESS_MODAL_CONTENT;
    let btnLabel = CONSTANTS.CREATE;

    if(this.props.mode === CONSTANTS.MODE_EDIT) {
      modalContent = CONSTANTS.EDIT_ADDRESS_MODAL_CONTENT;
      base.setState({
        btnLabel: CONSTANTS.FETCHING_ADDRESS
      });
      let addressId = this.props.addressId;
      this.props.dispatch(getAddress(addressId, function (addresses) {
        base.setState({
          btnLabel: CONSTANTS.SAVE
        });

        addresses.forEach(address => {
          base.setState({
            isShownMap: address.val().MethodType === CONSTANTS.METHOD_TYPE_MAP_VALUE
          });
          base.props.initialize({
            'methodType': address.val().MethodType,
            'streetName': address.val().StreetName,
            'ward': address.val().Ward,
            'district': address.val().District,
            'city': address.val().City,
            'country': address.val().Country
          });
        })
      }));
    } else {
      base.setState({
        modalContent: modalContent,
        btnLabel: btnLabel
      });
    }
  }

  componentDidMount() {
    this.handleInitialize();
  }

  onChangeMethodType(e) {
    this.setState({
      isShownMap: e.target.value === CONSTANTS.METHOD_TYPE_MAP_VALUE,
      isFirstTime: false
    });
  }

  onGotCenterHandler(address) {
    if(this.props.mode === CONSTANTS.MODE_ADD || (!this.state.isFirstTime
      && this.props.mode === CONSTANTS.MODE_EDIT)) {
      this.props.initialize({
        'methodType': CONSTANTS.METHOD_TYPE_MAP_VALUE,
        'streetName': address.streetName,
        'ward': address.ward,
        'district': address.district,
        'city': address.city,
        'country': address.country
      });
    }
  }

  onCreatedSuccessCallback () {
    this.setState({
      modalContent: CONSTANTS.ADD_ADDRESS_MODAL_CONTENT,
      isShowModal: true,
      btnLabel: CONSTANTS.CREATE
    });
  }

  onCreatedFailedCallback() {
    this.setState({
      modalContent: CONSTANTS.CREATE_FAILED,
      isShowModal: true,
      btnLabel: CONSTANTS.CREATE
    });
  }

  onUpdatedSuccessCallback () {
    this.setState({
      modalContent: CONSTANTS.EDIT_ADDRESS_MODAL_CONTENT,
      isShowModal: true,
      btnLabel: CONSTANTS.SAVE
    });
  }

  onUpdatedFailedCallback() {
    this.setState({
      modalContent: CONSTANTS.CREATE_FAILED,
      isShowModal: true,
      btnLabel: CONSTANTS.SAVE
    });
  }

  render() {
    const { mode, addressId, handleSubmit, onCreate, onEdit } = this.props;
    let base = this, resetBtn, map, primaryActionLabel,
                modalTitle = CONSTANTS.EDIT_ADDRESS_MODAL_TITLE;

    if(mode === CONSTANTS.MODE_ADD) {
      resetBtn =
        <Button type="button" onClick={this.resetForm.bind(this)}>
            { CONSTANTS.RESET }
        </Button>;

      modalTitle = CONSTANTS.ADD_ADDRESS_MODAL_TITLE;
    }

    primaryActionLabel = CONSTANTS.GO_TO_ADDRESS_MANAGEMENT;

    if(this.state.isShownMap) {
      map = <Map onGotCenter={ this.onGotCenterHandler.bind(this) }/>;
    }

    return <form onSubmit={handleSubmit(address => {
            this.props.dispatch(submitAddress(address, function (ok) {
                if(ok) {
                    if(mode === CONSTANTS.MODE_ADD) {
                        base.setState({
                            btnLabel: CONSTANTS.CREATING
                        });
                        onCreate(address, base.onCreatedSuccessCallback.bind(base),
                                base.onCreatedFailedCallback.bind(base));
                    } else {
                        base.setState({
                            btnLabel: CONSTANTS.SAVING
                        });
                        onEdit(addressId, address, base.onUpdatedSuccessCallback.bind(base),
                                base.onUpdatedFailedCallback.bind(base));
                    }
                }
            }));
        })}>
        <Field
            name={ CONSTANTS.FIELD_METHOD_TYPE_NAME }
            component={formMethodTypeField}
            label={ CONSTANTS.METHOD_TYPE + ' *' }
            onChange={this.onChangeMethodType.bind(this)}
            />
        <Field
            name={ CONSTANTS.FIELD_STREET_NAME }
            component={formField}
            label={ CONSTANTS.STREET_NAME + ' *' }
            type="text"/>
        <Field
            name={ CONSTANTS.FIELD_WARD_NAME }
            component={formField}
            label={ CONSTANTS.WARD }
            type="text"/>
        <Field
            name={ CONSTANTS.FIELD_DISTRICT_NAME }
            component={formField}
            label={ CONSTANTS.DISTRICT }
            type="text"/>
        <Field
            name={ CONSTANTS.FIELD_CITY_NAME }
            component={formField}
            label={ CONSTANTS.CITY }
            type="text"/>
        <Field
            name={ CONSTANTS.FIELD_COUNTRY_NAME }
            component={formField}
            label={ CONSTANTS.COUNTRY }
            type="text"/>

        {map}

        <Button bsStyle = 'primary' type="submit"
            disabled={this.state.btnLabel === CONSTANTS.CREATING
                || this.state.btnLabel === CONSTANTS.FETCHING_ADDRESS
                || this.state.btnLabel === CONSTANTS.SAVING}>
            {this.state.btnLabel}
        </Button>
        &nbsp; &nbsp; &nbsp;
        { resetBtn }

        <ModalDialog modalTitle={modalTitle}
            primaryActionLabel={primaryActionLabel}
            onPrimaryAction={this.implementAction.bind(this)}
            onClose={this.closeDialog.bind(this)}
            showModal={this.state.isShowModal}
            modalContent={this.state.modalContent}/>
    </form>;
  }
}

export default reduxForm({
  form: CONSTANTS.ADDRESS_FORM_ID
})(connect()(withRouter(AddressFormView)));
