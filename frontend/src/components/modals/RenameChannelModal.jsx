import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";

const renameChannelSchema = yup.object().shape({
  channelName: yup
    .string()
    .min(3, "Название должно содержать не менее 3 символов")
    .max(20, "Название не должно превышать 20 символов")
    .required("Поле обязательно для заполнения"),
});

const RenameChannelModal = ({ show, onHide, onRename, currentChannel }) => {
  const handleRenameSubmit = (values) => {
    onRename(values.channelName);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Rename Channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channelName: currentChannel?.name || "" }}
          validationSchema={renameChannelSchema}
          onSubmit={handleRenameSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Field name="channelName" />
              {errors.channelName && touched.channelName ? (
                <div>{errors.channelName}</div>
              ) : null}
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
