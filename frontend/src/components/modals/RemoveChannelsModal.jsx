import React from "react";
import { Modal, Button } from "react-bootstrap";

const RemoveChannelModal = ({ show, onHide, onRemove, currentChannel }) => {
  console.log(currentChannel);
  const handleRemove = () => {
    onRemove(currentChannel);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>Уверены?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отменить
        </Button>
        <Button variant="danger" onClick={handleRemove}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal;
