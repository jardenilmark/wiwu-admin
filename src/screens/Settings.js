import React from 'react'
import { Layout, Form, Typography, Button, Avatar, Tag } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { Formik } from 'formik'

import { generateKey } from '../helpers/secret-key/generateKey'
import { editAdmin } from '../actions/admin/editAdmin.action'

import { EditAdminSchema } from '../schema/admin.schema'
import { Helmet } from 'react-helmet'

import GenericInput from '../components/GenericInput'

const { Text } = Typography

const Settings = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.admin.current)

  return (
    <Layout.Content style={styles.content}>
      <Helmet>
        <title>Settings - wiwu admin</title>
      </Helmet>

      <div>
        <Avatar src={require('../assets/images/user-avatar.png')} size={120} />
        <br />
        <br />
        <Text strong>{user.email}</Text>
        <br />
        <Tag color='green'>
          <b>{user.role.toUpperCase()}</b>
        </Tag>
        <Formik
          initialValues={{
            firstName: user.firstName,
            lastName: user.lastName,
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
                <GenericInput
                  required
                  label='First Name'
                  name='firstName'
                  placeholder='e.g. - Juan'
                  values={values}
                  errors={errors}
                  touched={touched}
                  isSubmitting={isSubmitting}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
                <GenericInput
                  required
                  label='Last Name'
                  name='lastName'
                  placeholder='e.g. - Dela Cruz'
                  values={values}
                  errors={errors}
                  touched={touched}
                  isSubmitting={isSubmitting}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
                <GenericInput
                  required
                  label='Phone Number'
                  name='phoneNumber'
                  placeholder='e.g. - 09123456789'
                  values={values}
                  errors={errors}
                  touched={touched}
                  isSubmitting={isSubmitting}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
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
    marginTop: '15px',
    marginLeft: '10px'
  },
  form: {
    width: 550,
    marginTop: 20,
    textAlign: 'left'
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

export default Settings
