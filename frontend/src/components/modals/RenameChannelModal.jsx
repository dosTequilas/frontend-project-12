import React, { useEffect, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";

const RenameChannelModal = ({ show, onHide, onRename, currentChannel }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus();
    }
  }, [show]);
  //i18n
  const { t } = useTranslation();

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
                <Form.Control
                  type="text"
                  name="channelName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.channelName}
                  ref={inputRef} // используем ref для фокуса
                  placeholder={t("addNamePlaceholder")}
                  autoFocus
                />
              </Form.Group>
              <div className="d-flex justify-content-end mt-3">
                <Button variant="secondary" onClick={onHide} className="me-2">
                  {t("cancel")}
                </Button>
                <Button variant="primary" type="submit">
                  {t("send")}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
