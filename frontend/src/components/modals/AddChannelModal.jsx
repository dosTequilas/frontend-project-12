import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const channelSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Channel must be at least 3 characters")
    .max(20, "Channel name be no more than 20 characters")
    .required("Channel name is required"),
});

// const AddChannelModal = ({ show, onHide, onAdd, channels }) => {
//   const [channelName, setChannelName] = useState("");

//   const handleAdd = () => {
//     onAdd(channelName);
//     setChannelName("");
//   };

//   return (
//     <Modal show={show} onHide={onHide}>
//       <Modal.Header closeButton>
//         <Modal.Title>Добавить канал</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Form.Group>
//             <Form.Label>Название канала</Form.Label>
//             <Form.Control
//               type="text"
//               value={channelName}
//               onChange={(e) => setChannelName(e.target.value)}
//               placeholder="Введите название канала"
//             />
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onHide}>
//           Отмена
//         </Button>
//         <Button variant="primary" onClick={handleAdd}>
//           Добавить
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

const AddChannelModal = ({ show, onHide, onAdd, channels }) => {
  const channelNames = channels.map((channel) => channel.name);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: "" }}
          validationSchema={channelSchema}
          onSubmit={(values, { setSubmitting }) => {
            if (channelNames.includes(values.name)) {
              alert("Channel name already exists");
              setSubmitting(false);
              return;
            }
            onAdd(values.name);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formChannelName">
                <Form.Label>Channel Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  isInvalid={touched.name && !!errors.name}
                  placeholder="Enter channel name"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Add Channel
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
