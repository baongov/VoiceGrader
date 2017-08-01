import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Modal, Popup, popup} from 'react-bootstrap';

const PopupModal = React.createClass({
  getInitialState() {
    return { showModal: false };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  render() {
    return (
      <div>
        <Button onClick={this.open}>
          {this.props.buttonName}
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.componentsInput}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>{this.props.closeBtn}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

module.exports = PopupModal
