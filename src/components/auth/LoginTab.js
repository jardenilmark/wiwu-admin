import React from 'react'
import { Button, Form, Input, Card } from 'antd'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { signIn } from '../../actions/user/signIn.action'
import { UserSignInSchema } from '../../schema/user.schema'

const initialValues = {
  emailAddress: '',
  password: ''
}

const LoginTab = () => {
  const dispatch = useDispatch()
  return (
    <Card bordered={false}>
      <Formik
        initialValues={initialValues}
        validationSchema={UserSignInSchema}
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
    marginTop: '15px'
  }
}

export default LoginTab
