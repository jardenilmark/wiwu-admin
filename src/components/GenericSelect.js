import React from 'react'
import { Form, Select } from 'antd'
import * as PropTypes from 'prop-types'

const { Item } = Form
const { Option } = Select

const GenericSelect = ({
  name,
  label,
  options,
  values,
  errors,
  touched,
  isSubmitting,
  handleBlur,
  setFieldValue,
  ...rest
}) => {
  return (
    <Item
      label={label}
      help={errors[name] && touched[name] ? errors[name] : ''}
      validateStatus={errors[name] && touched[name] ? 'error' : ''}
      style={styles.input}>
      <Select
        {...rest}
        name={name}
        disabled={isSubmitting}
        onBlur={handleBlur}
        onChange={value => setFieldValue(name, value)}
        value={values[name]}>
        {options.map(({ value, text }, index) => (
          <Option value={value} key={index}>
            {text}
          </Option>
        ))}
      </Select>
    </Item>
  )
}

const styles = {
  input: {
    margin: 0
  }
}

export default GenericSelect
