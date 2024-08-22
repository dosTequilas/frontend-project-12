import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddChannelModal = ({ show, onHide, onAdd }) => {
  const [channelName, setChannelName] = useState("");

  const handleAdd = () => {
    onAdd(channelName);
    setChannelName("");
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Название канала</Form.Label>
            <Form.Control
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              placeholder="Введите название канала"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отмена
        </Button>
        <Button variant="primary" onClick={handleAdd}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddChannelModal;
