import React from 'react'
import { Formik, FieldArray } from 'formik'
import { useDispatch } from 'react-redux'
import { Form, Input, Button, Select } from 'antd'

import { ContactSchema } from '../../schema/contact.schema'
import { createContact } from '../../actions/contact/createContact.action'

import AddressSearchInput from './AddressSearchInput'

const { Option } = Select

const initialValues = {
  name: '',
  address: '',
  department: 'medical',
  numbers: ['']
}

const CreateContactForm = ({ setDrawerVisibility }) => {
  const dispatch = useDispatch()

  return (
    <div style={styles.formWrapper}>
      <Formik
        initialValues={initialValues}
        validationSchema={ContactSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          await dispatch(createContact(values))
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
                label='Name'
                help={errors.name && touched.name ? errors.name : ''}
                validateStatus={errors.name && touched.name ? 'error' : ''}
                required
                style={styles.input}>
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
                style={styles.input}>
                <AddressSearchInput
                  values={values}
                  setFieldValue={setFieldValue}
                  handleBlur={handleBlur}
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
                  allowClear
                  disabled={isSubmitting}
                  onBlur={handleBlur}
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
                          <Form.Item
                            style={{
                              width: '100%',
                              margin: 0
                            }}
                            help={
                              errors.numbers && touched.numbers
                                ? errors.numbers
                                : ''
                            }
                            validateStatus={
                              errors.numbers && touched.numbers ? 'error' : ''
                            }>
                            <Input
                              name={`numbers.${index}`}
                              style={styles.input}
                              placeholder='e.g. 333-8484'
                              disabled={isSubmitting}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={number}
                            />
                          </Form.Item>
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
              <Form.Item label='Notes' required style={styles.input}>
                <Input.TextArea
                  name='notes'
                  rows={3}
                  disabled={isSubmitting}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.notes}
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

export default CreateContactForm
