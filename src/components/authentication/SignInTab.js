import React from 'react'
import { Button, Form, Input, Card } from 'antd'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'

import GenericInput from '../GenericInput'

import { signIn } from '../../actions/admin/signIn.action'

import { SignInAdminSchema } from '../../schema/admin.schema'

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
        validationSchema={SignInAdminSchema}
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
  buttonWrapper: {
    textAlign: 'center',
    margin: 0
  },
  card: {
    background: '#f5f5f5'
  }
}

export default SignInTab
