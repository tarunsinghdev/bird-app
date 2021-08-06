import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function NotFound() {
  const [show, setShow] = useState(false);

  const handleShow = (event) => {
    event.stopPropagation();
    setShow(true);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setShow(false);
  };

  const deleteModal = () => {
    return (
      <Modal
        id="deleteModal"
        className="modal"
        show={show}
        onHide={handleClose}
        centered
        size="sm"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <div>
            <span>Delete Tweet ?</span>
          </div>
          <div>This can’t be undone</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary">Delete</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const postHandler = () => {
    alert('clicked on div');
  };

  return (
    <>
      {show && deleteModal()}
      <div onClick={postHandler} style={{ border: '1px solid' }}>
        <h1>Hello CodeSandbox</h1>
        <Button variant="info" onClick={handleShow}>
          Delete
        </Button>
      </div>
    </>
  );
}
