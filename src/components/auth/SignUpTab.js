import React from 'react'
import { Button, Form, Input, Card } from 'antd'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { roles } from '../../constants/User'
import { AdminSignUpSchema } from '../../schema/user.schema'
import { signUp } from '../../actions/admin/signUp.action'

const initialValues = {
  emailAddress: '',
  password: '',
  firstName: '',
  lastName: '',
  phoneNumber: ''
}

const SignUpTab = () => {
  const dispatch = useDispatch()
  return (
    <Card bordered={false} style={styles.card}>
      <Formik
        initialValues={initialValues}
        validationSchema={AdminSignUpSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await dispatch(signUp({ ...values, role: roles.ADMIN }))
          setSubmitting(false)
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
              style={styles.form}>
              <Form.Item
                label='First Name'
                help={
                  errors.firstName && touched.firstName ? errors.firstName : ''
                }
                validateStatus={
                  errors.firstName && touched.firstName ? 'error' : ''
                }
                required
                style={styles.input}
                hasFeedback>
                <Input
                  name='firstName'
                  disabled={isSubmitting}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  style={styles.input}
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
                style={styles.input}
                hasFeedback>
                <Input
                  name='lastName'
                  disabled={isSubmitting}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  style={styles.input}
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
                style={styles.input}
                hasFeedback>
                <Input
                  name='emailAddress'
                  disabled={isSubmitting}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.emailAddress}
                  style={styles.input}
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
                  style={styles.input}
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
                style={styles.input}
                hasFeedback>
                <Input
                  name='phoneNumber'
                  disabled={isSubmitting}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
                  style={styles.input}
                />
              </Form.Item>
              <Form.Item style={styles.buttonWrapper}>
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
  button: {
    width: '150px',
    marginTop: '15px'
  },
  form: {
    textAlign: 'left'
  },
  input: {
    margin: 0
  },
  buttonWrapper: {
    textAlign: 'center',
    margin: 0
  },
  card: {
    background: '#f5f5f5'
  }
}

export default SignUpTab
