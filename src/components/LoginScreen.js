import React from 'react'
import { Button, Form, Input, Icon, Card, Typography } from 'antd'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/user/userLogin.actions'
const { Title } = Typography
const initialValues = {
  username: '',
  password: ''
}

const LoginScreen = () => {
  const dispatch = useDispatch()
  const current = useSelector(state => state.user.current)
  console.log(current)
  return (
    <Card style={styles.loginForm}>
      <Title style={{ textAlign: 'center' }}>Login</Title>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false)
          }, 400)
          dispatch(login(values.username, values.password))
        }}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          setFieldTouched
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Item>
              <Input
                prefix={<Icon type='user' style={styles.input} />}
                placeholder='Username'
                name='username'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
            </Form.Item>
            <Form.Item>
              <Input
                prefix={<Icon type='lock' style={styles.input} />}
                name='password'
                type='password'
                placeholder='Password'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit' style={styles.button}>
                Log in
              </Button>
              or <a href='/signUp'>register now!</a>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </Card>
  )
}

const styles = {
  loginForm: {
    maxWidth: '400px',
    margin: 'auto',
    marginTop: '10%',
    padding: '10px'
  },
  input: {
    color: 'rgba(0,0,0,.25)'
  },
  button: {
    width: '100%'
  }
}

export default LoginScreen
