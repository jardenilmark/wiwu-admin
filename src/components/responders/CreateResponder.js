import React from 'react'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { ResponderSignUpSchema } from '../../schema/user.schema'
import { createResponder } from '../../actions/responder/createResponder.action'
import { Form, Input, Button, Select } from 'antd'

const { Option } = Select

const initialValues = {
  emailAddress: '',
  password: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  department: 'Philippine National Police Iloilo'
}

const CreateResponder = ({ setDrawerVisibility }) => {
  const dispatch = useDispatch()
  return (
    <div style={styles.formWrapper}>
      <Formik
        initialValues={initialValues}
        validationSchema={ResponderSignUpSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          await dispatch(createResponder(values))
          setSubmitting(false)
          resetForm(initialValues)
          setDrawerVisibility(false)
        }}>
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
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
                  placeholder='e.g. Juan'
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
                Dashboard
                required
                style={styles.input}
                hasFeedback>
                <Input
                  name='lastName'
                  placeholder='e.g. Dela Cruz'
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
                  placeholder='e.g. 09123456789'
                  disabled={isSubmitting}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
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
                  placeholder='e.g. juan.delacruz@gmail.com'
                  disabled={isSubmitting}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.emailAddress}
                  style={styles.input}
                />
              </Form.Item>
              <Form.Item
                label='Department'
                help={
                  errors.department && touched.department
                    ? errors.department
                    : ''
                }
                validateStatus={
                  errors.department && touched.department ? 'error' : ''
                }
                required
                style={styles.input}
                hasFeedback>
                <Select
                  name='department'
                  disabled={isSubmitting}
                  onChange={value => setFieldValue('department', value)}
                  value={values.department}>
                  <Option value='Philippine National Police Iloilo'>
                    Philippine National Police Iloilo
                  </Option>
                  <Option value='Bureau of Fire Protection Iloilo'>
                    Bureau of Fire Protection Iloilo
                  </Option>
                  <Option value='Iloilo City Emergency Response Team'>
                    Iloilo City Emergency Response Team
                  </Option>
                </Select>
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
          )
        }}
      </Formik>
    </div>
  )
}

const styles = {
  button: {
    width: '150px',
    marginTop: '15px'
  },
  form: {
    textAlign: 'left',
    width: '500px'
  },
  input: {
    margin: 0
  },
  buttonWrapper: {
    textAlign: 'center',
    margin: 0
  },
  formWrapper: {
    display: 'flex',
    justifyContent: 'center'
  }
}

export default CreateResponder
