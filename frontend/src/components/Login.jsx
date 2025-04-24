import React from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthData } from '../store/authSlice';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <h1>{t('login')}</h1>
          {/* Форма авторизации */}
          <p>
            {t('dontHaveAnAccount')}
            <Link to="/signup">{t('register')}</Link>
          </p>
          <Formik
            initialValues={{ username: '', password: '' }}
            validate={(values) => {
              const errors = {};
              if (!values.username) {
                errors.username = 'Required';
              }
              if (!values.password) {
                errors.password = 'Required';
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              // Проверка на наличие интернет-соединения
              if (!navigator.onLine) {
                toast.error('Ошибка соединения', {
                  position: 'bottom-right',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                setSubmitting(false);
                return; // Останавливаем выполнение запроса, если нет соединения
              }

              try {
                const response = await axios.post('/api/v1/login', {
                  username: values.username,
                  password: values.password,
                });

                dispatch(
                  setAuthData({
                    token: response.data.token,
                    username: values.username,
                  })
                );

                setSubmitting(false);
                navigate('/Chat'); // Перенаправление на страницу чата
              } catch (error) {
                console.log(error);
                if (error.response.status === 401) {
                  setErrors({ submit: t('invalidCredentials') });
                  return;
                }
                if (error.response.status !== 401) {
                  toast.error(t('NetworkError'), {
                    position: 'bottom-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                  return;
                }
                toast.error(t('UnidentifiedError'), {
                  position: 'bottom-right',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });

                setSubmitting(false);
              }
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
                <Form.Group controlId="formUsername">
                  <Form.Label>
                    {t('username')}
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder={t('username')}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      isInvalid={touched.username && !!errors.username}
                    />
                  </Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formPassword" className="mt-3">
                  <Form.Label>
                    {t('password')}
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder={t('password')}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      isInvalid={touched.password && !!errors.password}
                    />
                  </Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                {errors.submit && (
                  <div className="mt-3">
                    <p className="text-danger">{errors.submit}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  className="mt-4"
                  disabled={isSubmitting}
                >
                  {t('enter')}
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
