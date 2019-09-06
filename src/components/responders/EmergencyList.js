import { Row, Layout } from 'antd'
import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'

import EmergencyColumn from './EmergencyColumn'

import { getEmergencies } from '../../actions/emergency/getEmergencies.action'

const EmergencyList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEmergencies())
  }, [])

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
