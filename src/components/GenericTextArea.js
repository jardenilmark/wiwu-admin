import React from 'react'
import { Form, Input } from 'antd'
import * as PropTypes from 'prop-types'

const { Item } = Form
const { TextArea } = Input

const GenericTextArea = ({
  name,
  label,
  rows,
  values,
  errors,
  touched,
  isSubmitting,
  handleChange,
  handleBlur,
  ...rest
}) => {
  return (
    <Item
      label={label}
      help={errors[name] && touched[name] ? errors[name] : ''}
      validateStatus={errors[name] && touched[name] ? 'error' : ''}
      style={styles.input}>
      <TextArea
        {...rest}
        name={name}
        rows={rows}
        disabled={isSubmitting}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[name]}
        style={styles.input}
      />
    </Item>
  )
}

const styles = {
  input: {
    margin: 0
  }
}

export default GenericTextArea
