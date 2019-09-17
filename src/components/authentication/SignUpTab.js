import React from 'react'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { Button, Form, Card } from 'antd'

import GenericInput from '../GenericInput'

import { roles } from '../../constants/User'

import { SignUpAdminSchema } from '../../schema/admin.schema'

import { signUp } from '../../actions/admin/signUp.action'

const initialValues = {
  emailAddress: '',
  password: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  adminKey: ''
}

const SignUpTab = () => {
  const dispatch = useDispatch()

  return (
    <Card bordered={false} style={styles.card}>
      <Formik
        initialValues={initialValues}
        validationSchema={SignUpAdminSchema}
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
              <GenericInput
                required
                label='First Name'
                name='firstName'
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
                values={values}
                errors={errors}
                touched={touched}
                isSubmitting={isSubmitting}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <GenericInput
                required
                label='Email Address'
                name='emailAddress'
                values={values}
                errors={errors}
                touched={touched}
                isSubmitting={isSubmitting}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <GenericInput
                required
                type='password'
                label='Password'
                name='password'
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
                values={values}
                errors={errors}
                touched={touched}
                isSubmitting={isSubmitting}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <GenericInput
                required
                label='Admin Key'
                name='adminKey'
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
  buttonWrapper: {
    textAlign: 'center',
    margin: 0
  },
  card: {
    background: '#f5f5f5'
  }
}

export default SignUpTab
