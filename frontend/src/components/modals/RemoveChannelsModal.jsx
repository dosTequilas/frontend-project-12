import React from "react";
import { Modal, Button } from "react-bootstrap";

const RemoveChannelModal = ({ show, onHide, onRemove, currentChannel }) => {
  const handleRemove = () => {
    onRemove(currentChannel);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Вы уверены, что хотите удалить канал &quot;{currentChannel?.name}&quot;?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отмена
        </Button>
        <Button variant="danger" onClick={handleRemove}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannelModal;
