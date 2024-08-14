import React from "react";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthData } from "../store/authSlice";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1>Login</h1>
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
              try {
                const response = await axios.post("/api/v1/login", {
                  username: values.username,
                  password: values.password,
                });

                localStorage.setItem("username", values.username); // сохраняем в local storage текущего пользователя
                localStorage.setItem("token", response.data.token); // сохраняем в local storage token - это просто key.
                console.log("Current Username:", values.username);

                dispatch(
                  setAuthData({
                    token: response.data.token,
                    username: values.username,
                  })
                );

                setSubmitting(false);
                navigate("/Chat"); // Перенаправление на страницу чата
              } catch (error) {
                setErrors({ submit: "Invalid credentials" }); // очистка ошибок - оно нам надо?
                setSubmitting(false);
              } // 2 пункт - обработка ошибки авторизации.
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
                  <Alert variant="danger" className="mt-3">
                    {errors.submit}
                  </Alert>
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
