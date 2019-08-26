import React from 'react'
import { Spin, Icon } from 'antd'

const Spinner = ({ tip }) => {
  return (
    <div style={styles.spinnerWrapper}>
      <Spin
        indicator={<Icon type='loading' style={styles.indicator} spin />}
        tip={<span style={styles.tip}>{tip}</span>}
      />
    </div>
  )
}

const styles = {
  spinnerWrapper: {
    height: 700,
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
