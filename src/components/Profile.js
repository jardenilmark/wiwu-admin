import React from 'react'
import { Layout, Form, Input, Button, Avatar } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik'

import { editAdmin } from '../actions/admin/editAdmin.action'

import { EditAdminSchema } from '../schema/admin.schema'

const Profile = () => {
  const dispatch = useDispatch()
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
            await dispatch(editAdmin(values, user.uid))
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
    width: 550,
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

export default Profile
