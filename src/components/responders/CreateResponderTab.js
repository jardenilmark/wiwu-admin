import React from 'react'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { UserSignUpSchema } from '../../schema/user.schema'
import { roles } from '../../constants/User'
import { signUp } from '../../actions/user/signUp.action'
import { Form, Input, Button, Select } from 'antd'

const { Option } = Select

const initialValues = {
  emailAddress: '',
  password: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  department: ''
}

const CreateResponder = ({ history }) => {
  const dispatch = useDispatch()
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }}>
      <Formik
        initialValues={initialValues}
        validationSchema={UserSignUpSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await dispatch(signUp({ ...values, role: roles.RESPONDER }))
          history.push('/manage-responders/view-responders')
          setSubmitting(false)
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
              style={{ textAlign: 'left', width: '600px' }}>
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
                Dashboard
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
                style={{ margin: 0 }}
                hasFeedback>
                <Select
                  name='department'
                  onChange={value => setFieldValue('department', value)}
                  value={values.department}>
                  <Option value='PNP'>Philippine National Police Iloilo</Option>
                  <Option value='BFP'>Bureau of Fire Protection Iloilo</Option>
                  <Option value='ICER'>
                    Iloilo City Emergency Response Team
                  </Option>
                </Select>
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
    </div>
  )
}

const styles = {
  button: {
    width: '150px',
    marginTop: '15px'
  }
}

export default CreateResponder
