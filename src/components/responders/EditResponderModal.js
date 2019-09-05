import React from 'react'
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { EditResponderSchema } from '../../schema/responder.schema'
import { editResponder } from '../../actions/responder/editResponder.action'
import { toggleEditModal } from '../../actions/responder/toggleEditModal.action'
import { Form, Input, Button, Select, Modal } from 'antd'

const { Option } = Select

const EditResponder = () => {
  const dispatch = useDispatch()
  const responder = useSelector(state => state.responder.selectedResponder)
  const visible = useSelector(state => state.responder.editModalVisibility)

  return (
    <Modal
      centered={true}
      visible={visible}
      footer={null}
      destroyOnClose={true}
      maskClosable={false}
      bodyStyle={{ padding: 20, backgroundColor: '#f5f5f5' }}
      title={<strong>Update Responder Details</strong>}
      onCancel={() => dispatch(toggleEditModal())}>
      <Formik
        enableReinitialize={true}
        initialValues={responder}
        validationSchema={EditResponderSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await dispatch(editResponder(values, responder.id))
          setSubmitting(false)
          dispatch(toggleEditModal())
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
                  disabled={isSubmitting}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
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
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          )
        }}
      </Formik>
    </Modal>
  )
}

const styles = {
  button: {
    width: '150px',
    marginTop: '15px'
  },
  form: {
    textAlign: 'left',
    width: '100%'
  },
  input: {
    margin: 0
  },
  buttonWrapper: {
    textAlign: 'center',
    margin: 0
  }
}

export default EditResponder
