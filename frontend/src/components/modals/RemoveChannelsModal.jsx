import React from "react";
import { Modal, Button } from "react-bootstrap";

const RemoveChannelModal = ({ show, onHide, onRemove, currentChannel }) => {
  console.log(currentChannel);
  const handleRemove = () => {
    onRemove(currentChannel);
    //есть ощущение что эти три строки ввыше надо удалить и использовать функцию удаления которая там, по f12 (кстати как это все называется)
    // при нажатии "отмена" в модалке удаление все равно происходит.
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
