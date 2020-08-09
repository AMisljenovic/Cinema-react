import React from 'react';
import './HallModal.css';
import Modal from 'react-bootstrap/Modal';
import Body from 'react-bootstrap/ModalBody';
import Footer from 'react-bootstrap/ModalFooter';
import Button from 'react-bootstrap/Button';


const HallModal = () => (
  <Modal.Dialog>

    <Modal.Body>
      <p>Modal body text goes here.</p>
    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary">Close</Button>
      <Button variant="primary">Save changes</Button>
    </Modal.Footer>
  </Modal.Dialog>
);

export default HallModal;
