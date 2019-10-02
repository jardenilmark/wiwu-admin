import { Row, Layout } from 'antd'
import React from 'react'

import EmergencyColumn from '../components/emergency-request/EmergencyColumn'
import { Helmet } from 'react-helmet'

const EmergencyRequests = () => (
  <Layout.Content style={{ height: '100%', overflow: 'hidden' }}>
    <Helmet>
      <title>Emergency Requests - wiwu admin</title>
    </Helmet>

    <Row>
      <EmergencyColumn title={'Pending'} />
      <EmergencyColumn title={'Completed'} />
    </Row>
  </Layout.Content>
)

export default EmergencyRequests
