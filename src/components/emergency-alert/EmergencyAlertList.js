import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { List } from 'antd'
import { useDispatch } from 'react-redux'

import { getEmergencyAlerts } from '../../actions/emergency-alert/getEmergencyAlerts.action'

import Spinner from '../Spinner'
import EmergencyAlertListItem from './EmergencyAlertListItem'

const EmergencyAlertList = ({
  alerts,
  setSelectedAlert,
  setDrawerVisibility
}) => {
  const dispatch = useDispatch()
  const [fetching, setFetchingStatus] = useState(true)

  useEffect(() => {
    async function fetchData() {
      await dispatch(getEmergencyAlerts())
      setFetchingStatus(false)
    }

    fetchData()
  }, [])

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
          <EmergencyAlertListItem
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

EmergencyAlertList.propTypes = {
  alerts: PropTypes.array.isRequired,
  setDrawerVisibility: PropTypes.func.isRequired,
  setSelectedAlert: PropTypes.func.isRequired
}

export default EmergencyAlertList
