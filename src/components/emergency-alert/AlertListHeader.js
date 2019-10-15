import React from 'react'
import PropTypes from 'prop-types'
import { Input, Radio, Button } from 'antd'

const AlertListHeader = ({
  filter,
  setDrawerVisibility,
  setFilter,
  searchAlerts
}) => {
  return (
    <div style={styles.headerWrapper}>
      <Input.Search
        placeholder='Search emergency alerts...'
        style={{ width: 240 }}
        onSearch={value => searchAlerts(value)}
      />
      <Radio.Group
        value={filter}
        buttonStyle='solid'
        onChange={e => {
          const value = e.target.value
          setFilter(value)
        }}>
        <Radio.Button value='all'>
          <strong>All</strong>
        </Radio.Button>
        <Radio.Button value='active'>
          <strong>Active</strong>
        </Radio.Button>
        <Radio.Button value='archived'>
          <strong>Archived</strong>
        </Radio.Button>
      </Radio.Group>
      <Button icon='alert' onClick={() => setDrawerVisibility(true)}>
        Add Emergency Alert
      </Button>
    </div>
  )
}

const styles = {
  headerWrapper: {
    width: '70%',
    marginLeft: '15%',
    marginTop: 40,
    marginBottom: 30,
    display: 'flex',
    justifyContent: 'space-between'
  }
}

AlertListHeader.propTypes = {
  filter: PropTypes.string.isRequired,
  setDrawerVisibility: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  searchAlerts: PropTypes.func.isRequired
}

export default AlertListHeader
