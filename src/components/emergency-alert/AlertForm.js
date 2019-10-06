import React from 'react'
import { Formik } from 'formik'
import { Form, Button } from 'antd'
import { useDispatch } from 'react-redux'

import { CreateAlertSchema } from '../../schema/alert.schema'

import GenericTextArea from '../GenericTextArea'

import { createAlert } from '../../actions/emergency-alert/createEmergencyAlert.action'
import { updateEmergencyAlert } from '../../actions/emergency-alert/updateEmergencyAlert.action'

const AlertForm = ({ selectedAlert, setDrawerVisibility }) => {
  const dispatch = useDispatch()

  return (
    <div style={styles.formWrapper}>
      <Formik
        initialValues={selectedAlert}
        validationSchema={CreateAlertSchema}
        onSubmit={async (values, { setSubmitting }) => {
          if (selectedAlert) {
            await dispatch(updateEmergencyAlert(selectedAlert.id, values))
          } else {
            await dispatch(createAlert(values))
          }

          setSubmitting(false)
          setDrawerVisibility(false)
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
              <GenericTextArea
                label='Alert Message'
                name='message'
                rows={4}
                values={values}
                errors={errors}
                touched={touched}
                isSubmitting={isSubmitting}
                handleBlur={handleBlur}
                handleChange={handleChange}
              />
              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  disabled={!dirty}
                  loading={isSubmitting}>
                  {selectedAlert ? 'Update Alert' : 'Create Alert'}
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
  formWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  form: {
    textAlign: 'left',
    width: '500px'
  }
}

export default AlertForm
