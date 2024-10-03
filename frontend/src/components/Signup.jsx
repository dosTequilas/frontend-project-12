import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const Signup = () => {
  const initialValues = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Имя пользователя должно быть от 3 до 20 символов")
      .max(20, "Имя пользователя должно быть от 3 до 20 символов")
      .required("Обязательное поле"),
    password: Yup.string()
      .min(6, "Пароль должен содержать не менее 6 символов")
      .required("Обязательное поле"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Пароли должны совпадать")
      .required("Обязательное поле"),
  });

  const onSubmit = (values) => {
    // Логика для отправки данных на сервер
    console.log("Form data", values);
  };

  return (
    // axios.post('/api/v1/signup', { username: 'newuser', password: '123456' }).then((response) => {
    //   console.log(response.data); // => { token: ..., username: 'newuser' }
    // });

    <div className="signup-page">
      <h2>Регистрация</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="username">Имя пользователя</label>
            <Field type="text" id="username" name="username" />
            <ErrorMessage name="username" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Подтвердите пароль</label>
            <Field
              type="password"
              id="confirmPassword"
              name="confirmPassword"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="error"
            />
          </div>

          <button type="submit">Зарегистрироваться</button>
        </Form>
      </Formik>
      <p>
        Уже есть аккаунт? <Link to="/login">Авторизоваться</Link>
      </p>
    </div>
  );
};

export default Signup;
