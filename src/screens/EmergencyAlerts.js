import React, { useState } from 'react'
import { Layout, Drawer } from 'antd'
import { Helmet } from 'react-helmet'

import EmergencyAlertForm from '../components/emergency-alert/EmergencyAlertForm'
import EmergencyAlertListHeader from '../components/emergency-alert/EmergencyAlertListHeader'
import EmergencyAlertList from '../components/emergency-alert/EmergencyAlertList'

const EmergencyAlerts = () => {
  const [drawerVisibility, setDrawerVisibility] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState(null)
  const [filter, setFilter] = useState('all')

  return (
    <Layout.Content style={styles.content}>
      <Helmet>
        <title>Emergency Alerts - wiwu admin</title>
      </Helmet>

      <Drawer
        title={
          <b>
            {selectedAlert ? 'Edit Emergency Alert' : 'Create Emergency Alert'}
          </b>
        }
        width={550}
        destroyOnClose={true}
        maskClosable={true}
        keyboard={false}
        bodyStyle={{ background: '#f5f5f5', height: '94%' }}
        onClose={() => {
          setSelectedAlert(null)
          setDrawerVisibility(false)
        }}
        visible={drawerVisibility}>
        <EmergencyAlertForm
          selectedAlert={selectedAlert}
          setDrawerVisibility={setDrawerVisibility}
        />
      </Drawer>
      <EmergencyAlertListHeader
        filter={filter}
        setFilter={setFilter}
        setDrawerVisibility={setDrawerVisibility}
      />
      <EmergencyAlertList
        filter={filter}
        setSelectedAlert={setSelectedAlert}
        setDrawerVisibility={setDrawerVisibility}
      />
    </Layout.Content>
  )
}

const styles = {
  content: {
    height: '100%',
    overflowY: 'auto'
  }
}

export default EmergencyAlerts
