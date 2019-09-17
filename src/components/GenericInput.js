import React from 'react'
import { Form, Input } from 'antd'
import * as PropTypes from 'prop-types'

const { Item } = Form

const GenericInput = ({
  name,
  label,
  values,
  errors,
  touched,
  placeholder,
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
      <Input
        {...rest}
        name={name}
        placeholder={placeholder}
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

export default GenericInput
