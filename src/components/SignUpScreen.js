import React from 'react'
import { Button, Form, Input, Icon, Card, Typography } from 'antd'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { signUp } from '../actions/user/userSignUp.actions'
const { Title } = Typography
const initialValues = {
  emailAddress: '',
  password: '',
  firstName: '',
  lastName: '',
  phoneNumber: ''
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}

const SignUpScreen = () => {
  const dispatch = useDispatch()
  return (
    <Card style={styles.loginForm} bordered={false}>
      <Title style={{ textAlign: 'center' }} strong level={3}>
        Sign Up
      </Title>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false)
          }, 1500)
          dispatch(signUp(values))
        }}>
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit} {...formItemLayout}>
            <Form.Item label={'Email Address'} required>
              <Input
                name='emailAddress'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emailAddress}
              />
            </Form.Item>
            <Form.Item label={'Password'} required>
              <Input
                name='password'
                type='password'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </Form.Item>
            <Form.Item label={'First Name'} required>
              <Input
                name='firstName'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
              />
            </Form.Item>
            <Form.Item label='Last Name' required>
              <Input
                name='lastName'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
              />
            </Form.Item>
            <Form.Item label={'Phone Number'} required>
              <Input
                name='phoneNumber'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNumber}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                style={styles.button}
                loading={isSubmitting}>
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </Card>
  )
}

const styles = {
  loginForm: {
    maxHeight: '500px',
    maxWidth: '400px'
  },
  button: {
    width: '50%',
    marginLeft: '25%'
  }
}

export default SignUpScreen
