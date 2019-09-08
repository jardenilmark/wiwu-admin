import React from 'react'
import { Formik, FieldArray } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { editContact } from '../../actions/contact/editContact.action'
import { toggleEditModal } from '../../actions/contact/toggleEditModal.action'
import { ContactSchema } from '../../schema/contact.schema'
import { Form, Input, Button, Select, Modal } from 'antd'

const { Option } = Select

const EditContact = () => {
  const dispatch = useDispatch()
  const contact = useSelector(state => state.contact.selectedContact)
  const visible = useSelector(state => state.contact.editModalVisibility)

  return (
    <Modal
      centered={true}
      visible={visible}
      footer={null}
      destroyOnClose={true}
      maskClosable={false}
      bodyStyle={{ padding: 20, backgroundColor: '#f5f5f5' }}
      title={<strong>Update Contact Details</strong>}
      onCancel={() => dispatch(toggleEditModal())}>
      <Formik
        initialValues={contact}
        validationSchema={ContactSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          await dispatch(editContact(values, contact.id))
          resetForm()
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
                label='Name'
                help={errors.name && touched.name ? errors.name : ''}
                validateStatus={errors.name && touched.name ? 'error' : ''}
                required
                style={styles.input}
                hasFeedback>
                <Input
                  name='name'
                  placeholder='e.g. Iloilo Mission Hospital'
                  disabled={isSubmitting}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  style={styles.input}
                />
              </Form.Item>
              <Form.Item
                label='Address'
                help={errors.address && touched.address ? errors.address : ''}
                validateStatus={
                  errors.address && touched.address ? 'error' : ''
                }
                required
                style={styles.input}
                hasFeedback>
                <Input
                  name='address'
                  placeholder='e.g. Lopez Jaena St. Jaro, Iloilo City'
                  disabled={isSubmitting}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
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
                  placeholder='e.g. Medical'
                  disabled={isSubmitting}
                  onChange={value => setFieldValue('department', value)}
                  value={values.department}>
                  <Option value='medical'>Medical</Option>
                  <Option value='police'>Police</Option>
                  <Option value='fire'>Fire</Option>
                </Select>
              </Form.Item>
              <Form.Item label='Phone Number(s)' required style={styles.input}>
                <FieldArray
                  name='numbers'
                  render={arrayHelpers => (
                    <div>
                      {values.numbers.map((number, index) => (
                        <div
                          key={index}
                          style={{
                            width: '100%',
                            display: 'flex',
                            marginBottom: 10
                          }}>
                          <Input
                            name={`numbers.${index}`}
                            style={styles.input}
                            placeholder='e.g. 333-8484'
                            disabled={isSubmitting}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={number}
                          />
                          <Button
                            shape='circle'
                            type='dashed'
                            icon='close'
                            disabled={isSubmitting}
                            style={{ float: 'right', marginLeft: 10 }}
                            onClick={() => arrayHelpers.remove(index)}
                          />
                        </div>
                      ))}
                      <Button
                        type='dashed'
                        disabled={isSubmitting}
                        onClick={() => arrayHelpers.push('')}>
                        Add Number
                      </Button>
                    </div>
                  )}
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

export default EditContact
