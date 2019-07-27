import React from 'react'
import { Button, Form, Input, Card, Alert } from 'antd'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { userSignUpSchema } from '../../schema/user.schema'
import { signUp } from '../../actions/user/signUp.action'
import { clearSignUpErrors } from '../../actions/user/clearSignupErrors.action'

const initialValues = {
  emailAddress: '',
  password: '',
  firstName: '',
  lastName: '',
  phoneNumber: ''
}

const SignupTab = () => {
  const dispatch = useDispatch()
  const signUpError = useSelector(state => state.user.signUpError)
  return (
    <Card style={styles.loginForm} bordered={false}>
      {signUpError && (
        <Alert
          message={signUpError}
          type='error'
          banner
          closable
          onClose={() => {
            dispatch(clearSignUpErrors())
          }}
        />
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={userSignUpSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          await dispatch(signUp(values))
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
          touched,
          dirty
        }) => {
          return (
            <Form
              onSubmit={handleSubmit}
              layout='vertical'
              autoComplete='off'
              hideRequiredMark
              style={{ textAlign: 'left' }}>
              <Form.Item
                label='First Name'
                help={
                  errors.firstName && touched.firstName ? errors.firstName : ''
                }
                validateStatus={
                  errors.firstName && touched.firstName ? 'error' : ''
                }
                required
                style={{ margin: 0 }}
                hasFeedback>
                <Input
                  name='firstName'
                  disabled={isSubmitting}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  style={{ margin: 0 }}
                />
              </Form.Item>
              <Form.Item
                label='Last Name'
                help={
                  errors.lastName && touched.lastName ? errors.lastName : ''
                }
                validateStatus={
                  errors.lastName && touched.lastName ? 'error' : ''
                }
                required
                style={{ margin: 0 }}
                hasFeedback>
                <Input
                  name='lastName'
                  disabled={isSubmitting}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  style={{ margin: 0 }}
                />
              </Form.Item>
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
                help={
                  errors.password && touched.password ? errors.password : ''
                }
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
              <Form.Item
                label='Phone Number'
                help={
                  errors.phoneNumber && touched.phoneNumber
                    ? errors.phoneNumber
                    : ''
                }
                validateStatus={
                  errors.phoneNumber && touched.phoneNumber ? 'error' : ''
                }
                required
                style={{ margin: 0 }}
                hasFeedback>
                <Input
                  name='phoneNumber'
                  disabled={isSubmitting}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
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
          )
        }}
      </Formik>
    </Card>
  )
}

const styles = {
  loginForm: {
    // width: '450px',
    // margin: 100
  },
  button: {
    width: '150px',
    marginTop: '10px'
  }
}

export default SignupTab
