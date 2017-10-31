import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class ModalDialog extends Component {

  render() {
    return <Modal show={this.props.showModal} onHide={this.props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{ this.props.modalTitle }</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div dangerouslySetInnerHTML={{__html: this.props.modalContent}}></div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.onClose}>Close</Button>
        <Button bsStyle="primary" onClick={this.props.onPrimaryAction}>
          {this.props.primaryActionLabel}
        </Button>
      </Modal.Footer>
    </Modal>;
  }
}

export default ModalDialog;
