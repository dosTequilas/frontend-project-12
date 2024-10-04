import React, { useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik } from "formik";

const RenameChannelModal = ({ show, onHide, onRename, currentChannel }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus();
    }
  }, [show]);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channelName: currentChannel.name }}
          onSubmit={(values) => {
            onRename(values.channelName);
            onHide();
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formChannelName">
                <Form.Label>Channel Name</Form.Label>
                <Form.Control
                  type="text"
                  name="channelName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.channelName}
                  ref={inputRef} // используем ref для фокуса
                  placeholder="Enter channel name"
                  autoFocus
                />
              </Form.Group>
              <Button variant="secondary" onClick={onHide}>
                Отменить
              </Button>
              <Button variant="primary" type="submit">
                Переименовать
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
