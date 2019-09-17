import { Row, Layout } from 'antd'
import React from 'react'

import EmergencyColumn from '../components/emergency-request/EmergencyColumn'

const EmergencyRequests = () => (
  <Layout.Content>
    <Row>
      <EmergencyColumn title={'PENDING'} />
      <EmergencyColumn title={'COMPLETED'} />
    </Row>
  </Layout.Content>
)

export default EmergencyRequests
