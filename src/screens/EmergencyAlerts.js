import React, { useEffect, useState } from 'react'
import { Layout, Drawer } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import FuzzySearch from 'fuzzy-search'
import _ from 'lodash'

import AlertForm from '../components/emergency-alert/AlertForm'
import AlertListHeader from '../components/emergency-alert/AlertListHeader'
import AlertList from '../components/emergency-alert/AlertList'
import { getEmergencyAlerts } from '../actions/emergency-alert/getEmergencyAlerts.action'

const EmergencyAlerts = () => {
  const dispatch = useDispatch()
  const [drawerVisibility, setDrawerVisibility] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState(null)
  const [filter, setFilter] = useState('all')
  const [searchedAlerts, setSearchedAlerts] = useState([])
  const [fetching, setFetchingStatus] = useState(true)
  const { alerts } = useSelector(({ admin }) => admin)

  useEffect(() => {
    async function fetchData() {
      await dispatch(getEmergencyAlerts())
      setFetchingStatus(false)
    }

    fetchData()
  }, [dispatch])

  useEffect(() => {
    setSearchedAlerts([])
  }, [filter])

  const filteredAlerts =
    filter === 'all' ? alerts : alerts.filter(alert => alert.status === filter)

  const searchAlerts = input => {
    const searcher = new FuzzySearch(filteredAlerts, ['message'], {
      sort: true
    })
    setSearchedAlerts(searcher.search(input))
  }

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
        <AlertForm
          selectedAlert={selectedAlert}
          setDrawerVisibility={setDrawerVisibility}
        />
      </Drawer>

      <AlertListHeader
        filter={filter}
        setFilter={setFilter}
        searchAlerts={searchAlerts}
        setDrawerVisibility={setDrawerVisibility}
      />

      <AlertList
        alerts={!_.isEmpty(searchedAlerts) ? searchedAlerts : filteredAlerts}
        fetching={fetching}
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
