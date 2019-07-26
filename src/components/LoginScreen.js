import React from 'react'
import { Button, Form, Input, Card, Alert } from 'antd'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { signIn, clearLoginErrors } from '../actions/user/userSignIn.actions'
import { userSignInSchema } from '../schema/user.schema'

const initialValues = {
  emailAddress: '',
  password: ''
}

const LoginScreen = () => {
  const dispatch = useDispatch()
  const current = useSelector(state => state.user.current)
  const loginError = useSelector(state => state.user.loginError)
  console.log(current)
  return (
    <Card style={styles.loginForm} bordered={false}>
      {loginError && (
        <Alert
          message={loginError}
          type='error'
          banner
          closable
          onClose={() => {
            dispatch(clearLoginErrors())
          }}
        />
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={userSignInSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          await dispatch(signIn(values))
          setSubmitting(false)
          resetForm(initialValues)
        }}>
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          errors,
          dirty,
          touched
        }) => (
          <Form
            onSubmit={handleSubmit}
            layout='vertical'
            autoComplete='off'
            hideRequiredMark
            style={{ textAlign: 'left' }}>
            <Form.Item
              label='Email Address'
              help={
                errors.emailAddress && touched.emailAddress
                  ? errors.emailAddress
                  : ''
              }
              validateStatus={
                errors.emailAddress && touched.emailAddress ? 'error' : ''
              }
              required
              style={{ margin: 0 }}
              hasFeedback>
              <Input
                name='emailAddress'
                disabled={isSubmitting}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emailAddress}
                style={{ margin: 0 }}
              />
            </Form.Item>
            <Form.Item
              label='Password'
              help={errors.password && touched.password ? errors.password : ''}
              validateStatus={
                errors.password && touched.password ? 'error' : ''
              }
              required
              style={{ margin: 0 }}
              hasFeedback>
              <Input.Password
                name='password'
                disabled={isSubmitting}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                style={{ margin: 0 }}
              />
            </Form.Item>
            <Form.Item style={{ textAlign: 'center', margin: 0 }}>
              <Button
                type='primary'
                htmlType='submit'
                shape='round'
                style={styles.button}
                disabled={!dirty}
                loading={isSubmitting}>
                Submit Details
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </Card>
  )
}

const styles = {
  button: {
    width: '150px',
    marginTop: '10px'
  }
}

export default LoginScreen
