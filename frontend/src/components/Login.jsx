import React from "react";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthData } from "../store/authSlice";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
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
                // добавить заголовок с токеном, сервер сравнивет.
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
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {errors.username && touched.username && (
                    <div className="text-danger">{errors.username}</div>
                  )}
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {errors.password && touched.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
                </div>
                {errors.submit && (
                  <div className="text-danger">{errors.submit}</div>
                )}
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
