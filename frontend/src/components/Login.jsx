import React from "react";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthData } from "../store/authSlice";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1>Login</h1>
          <h2>Авторизация</h2>
          {/* Форма авторизации */}
          <p>
            Нет аккаунта? <Link to="/signup">Зарегистрироваться</Link>
          </p>
          <Formik
            initialValues={{ username: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.username) {
                errors.username = "Required";
              }
              if (!values.password) {
                errors.password = "Required";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              // Проверка на наличие интернет-соединения
              if (!navigator.onLine) {
                toast.error("Ошибка соединения", {
                  position: "bottom-right",
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
                const response = await axios.post("/api/v1/login", {
                  username: values.username,
                  password: values.password,
                });

                localStorage.setItem("username", values.username); // сохраняем в local storage текущего пользователя
                localStorage.setItem("token", response.data.token); // сохраняем в local storage token

                dispatch(
                  setAuthData({
                    token: response.data.token,
                    username: values.username,
                  })
                );

                setSubmitting(false);
                navigate("/Chat"); // Перенаправление на страницу чата
              } catch (error) {
                toast.error("Invalid credentials", {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                setErrors({ submit: "Invalid credentials" });
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
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    isInvalid={touched.username && !!errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formPassword" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    isInvalid={touched.password && !!errors.password}
                  />
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
                  Submit
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
