import React from 'react'
import PropTypes from 'prop-types'
import { Spin, Icon } from 'antd'

const Spinner = ({ tip, height }) => {
  return (
    <div style={{ ...styles.spinnerWrapper, height }}>
      <Spin
        indicator={<Icon type='loading' style={styles.indicator} spin />}
        tip={<span style={styles.tip}>{tip}</span>}
      />
    </div>
  )
}

Spinner.propTypes = {
  height: PropTypes.number.isRequired,
  tip: PropTypes.string.isRequired
}

const styles = {
  spinnerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  indicator: {
    fontSize: 40,
    marginBottom: 15
  },
  tip: {
    fontSize: 16
  }
}

export default Spinner
