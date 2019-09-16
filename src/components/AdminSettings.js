import React from 'react'
import { Layout, Form, Input, Button, Avatar } from 'antd'
import { useSelector } from 'react-redux'
import { Formik } from 'formik'

import { generateKey } from '../helpers/secretKey/generateKey'

import { EditAdminSchema } from '../schema/admin.schema'

const AdminSettings = () => {
  const user = useSelector(state => state.admin.current)

  return (
    <Layout.Content style={styles.content}>
      <div>
        <Avatar src={require('../assets/images/user-avatar.png')} size={120} />
        <Formik
          initialValues={{
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.email,
            phoneNumber: user.phoneNumber
          }}
          validationSchema={EditAdminSchema}
          onSubmit={async (values, { setSubmitting }) => {
            // await dispatch(signUp({ ...values, role: roles.ADMIN }))
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
                  label='Email Address'
                  required
                  style={styles.input}
                  hasFeedback>
                  <Input
                    name='emailAddress'
                    disabled
                    value={values.emailAddress}
                    style={styles.input}
                  />
                </Form.Item>
                <Form.Item
                  label='First Name'
                  help={
                    errors.firstName && touched.firstName
                      ? errors.firstName
                      : ''
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
                  {user.role === 'admin' && (
                    <Button
                      type='danger'
                      shape='round'
                      style={styles.button}
                      disabled={isSubmitting}
                      onClick={() => generateKey()}>
                      Generate Key
                    </Button>
                  )}
                </Form.Item>
              </Form>
            )
          }}
        </Formik>
      </div>
    </Layout.Content>
  )
}

const styles = {
  content: {
    height: '100%',
    overflowY: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: '150px',
    marginTop: '15px'
  },
  form: {
    width: 600,
    marginTop: 20
  },
  input: {
    textAlign: 'left',
    marginBottom: 2
  },
  buttonWrapper: {
    textAlign: 'center',
    margin: 0
  }
}

export default AdminSettings
