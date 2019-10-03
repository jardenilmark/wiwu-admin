import React, { useState, useEffect } from 'react'
import { List } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { getEmergencyAlerts } from '../../actions/emergency-alert/getEmergencyAlerts.action'

import Spinner from '../Spinner'
import EmergencyAlertListItem from './EmergencyAlertListItem'

const EmergencyAlertList = ({
  filter,
  setSelectedAlert,
  setDrawerVisibility
}) => {
  const dispatch = useDispatch()
  const [fetching, setFetchingStatus] = useState(true)
  const { alerts } = useSelector(({ admin }) => admin)

  const filteredAlerts =
    filter === 'all' ? alerts : alerts.filter(alert => alert.status === filter)

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
        dataSource={filteredAlerts}
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

export default EmergencyAlertList
