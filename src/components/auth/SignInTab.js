import React from 'react'
import { Button, Form, Input, Card } from 'antd'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { signIn } from '../../actions/admin/signIn.action'
import { CreateAdminSchema } from '../../schema/admin.schema'

const initialValues = {
  emailAddress: '',
  password: ''
}

const SignInTab = () => {
  const dispatch = useDispatch()

  return (
    <Card bordered={false} style={styles.card}>
      <Formik
        initialValues={initialValues}
        validationSchema={CreateAdminSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await dispatch(signIn(values))
          setSubmitting(false)
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
            style={styles.form}>
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
              help={errors.password && touched.password ? errors.password : ''}
              validateStatus={
                errors.password && touched.password ? 'error' : ''
              }
              required
              style={styles.input}
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
        )}
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

export default SignInTab
