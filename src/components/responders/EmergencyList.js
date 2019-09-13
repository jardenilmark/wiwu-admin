import { Row, Layout } from 'antd'
import React from 'react'

import EmergencyColumn from './EmergencyColumn'

const EmergencyList = () => {
  const { Content } = Layout

  return (
    <Layout>
      <Content>
        <Row>
          <EmergencyColumn title={'PENDING'} />
          <EmergencyColumn title={'COMPLETED'} />
        </Row>
      </Content>
    </Layout>
  )
}

export default EmergencyList
