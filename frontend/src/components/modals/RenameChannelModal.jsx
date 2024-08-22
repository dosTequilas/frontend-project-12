import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const RenameChannelModal = ({ show, onHide, onRename, currentChannel }) => {
  const [newName, setNewName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (show) {
      setNewName(currentChannel?.name || "");
      inputRef.current?.select(); // Автоматическое выделение текста при открытии
    }
  }, [show, currentChannel]);

  const handleRename = () => {
    onRename(currentChannel.id, newName);
    setNewName("");
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Новое название канала</Form.Label>
            <Form.Control
              ref={inputRef}
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Введите новое название канала"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отмена
        </Button>
        <Button variant="primary" onClick={handleRename}>
          Переименовать
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RenameChannelModal;
