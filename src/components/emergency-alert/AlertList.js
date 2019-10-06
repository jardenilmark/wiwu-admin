import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'antd'

import Spinner from '../Spinner'
import AlertListItem from './AlertListItem'

const AlertList = ({
  alerts,
  fetching,
  setSelectedAlert,
  setDrawerVisibility
}) => {
  if (fetching) {
    return <Spinner tip='Fetching Emergency Alerts...' height={700} />
  }

  return (
    <div style={styles.listWrapper}>
      <List
        style={styles.list}
        itemLayout='horizontal'
        pagination={{ pageSize: 7, hideOnSinglePage: true, size: 'small' }}
        dataSource={alerts}
        renderItem={alert => (
          <AlertListItem
            alert={alert}
            setSelectedAlert={setSelectedAlert}
            setDrawerVisibility={setDrawerVisibility}
          />
        )}
      />
    </div>
  )
}

const styles = {
  listWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  list: {
    width: '70%',
    textAlign: 'left'
  }
}

AlertList.propTypes = {
  alerts: PropTypes.array.isRequired,
  setDrawerVisibility: PropTypes.func.isRequired,
  setSelectedAlert: PropTypes.func.isRequired
}

export default AlertList
