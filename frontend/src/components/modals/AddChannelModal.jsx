import { Modal, Button, Form } from 'react-bootstrap'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'

const channelSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Channel must be at least 3 characters')
    .max(20, 'От 3 до 20 символов')
    .required('Channel name is required'),
})

const AddChannelModal = ({ show, onHide, onAdd, channels }) => {
  const channelNames = channels.map(channel => channel.name)

  const { t } = useTranslation()

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: '' }}
          validationSchema={channelSchema}
          onSubmit={(values, { setSubmitting }) => {
            if (channelNames.includes(values.name)) {
              alert('Channel name already exists')
              setSubmitting(false)
              return
            }
            onAdd(values.name)
            setSubmitting(false)
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
                <Form.Control
                  type="text"
                  name="name"
                  id="channelName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  isInvalid={touched.name && !!errors.name}
                  autoFocus
                />
                <label htmlFor="channelName" className="visually-hidden">
                  {t('addNamePlaceholder')}
                </label>
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="d-flex justify-content-end mt-3">
                <Button variant="secondary" onClick={onHide} className="me-2">
                  {t('cancel')}
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {t('send')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  )
}

export default AddChannelModal
