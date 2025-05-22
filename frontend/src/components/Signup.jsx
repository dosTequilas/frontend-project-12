import { useDispatch } from 'react-redux'
import { setAuthData } from '../store/authSlice.js'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'
import {
  Form as BootstrapForm,
  Button,
  Container,
  Row,
  Col,
} from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
  }

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Имя пользователя должно быть от 3 до 20 символов')
      .max(20, 'Имя пользователя должно быть от 3 до 20 символов')
      .required('Обязательное поле'),
    password: Yup.string()
      .min(6, 'Пароль должен содержать не менее 6 символов')
      .required('Обязательное поле'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
      .required('Обязательное поле'),
  })

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post('/api/v1/signup', {
        username: values.username,
        password: values.password,
      })

      // Диспатчим action для сохранения данных в Redux и localStorage
      dispatch(
        setAuthData({
          token: response.data.token,
          username: values.username,
        }),
      )

      navigate('/chat')
    }
    catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          setErrors({ server: 'Такой пользователь уже существует' })
        }
        else {
          setErrors({
            server: error.response.data.message || 'Ошибка регистрации',
          })
        }
      }
      else {
        setErrors({ server: 'Ошибка сети' })
      }
    }
    finally {
      setSubmitting(false)
    }
  }

  const { t } = useTranslation()
  return (
    <Container className="signup-page my-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="text-center mb-4">
            <h2>{t('registration')}</h2>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, errors }) => (
              <Form>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label htmlFor="username">
                    {t('userEnterName')}
                  </BootstrapForm.Label>
                  <Field
                    className="form-control"
                    type="text"
                    id="username"
                    name="username"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label htmlFor="password">
                    {t('password')}
                  </BootstrapForm.Label>
                  <Field
                    className="form-control"
                    type="password"
                    id="password"
                    name="password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label htmlFor="confirmPassword">
                    {t('confirmPass')}
                  </BootstrapForm.Label>
                  <Field
                    className="form-control"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>

                {errors.server && (
                  <div className="text-danger">{errors.server}</div>
                )}

                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-100"
                >
                  {isSubmitting ? 'Отправка...' : 'Зарегистрироваться'}
                </Button>
              </Form>
            )}
          </Formik>

          <div className="text-center mt-3">
            <p>
              {t('alreadyHaveAnAccount')}
              {' '}
              <Link to="/login">{t('auth')}</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Signup
