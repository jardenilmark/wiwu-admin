import _ from 'lodash'
import { Row, Layout } from 'antd'
import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'
import { createAction } from 'redux-actions'

import EmergencyColumn from './EmergencyColumn'

import { firestore as db } from '../../firebase'

import { GET_EMERGENCIES } from '../../actions/emergency/emergency.constants'

const EmergencyList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // listens for new documents and updates
    const snapshot = db
      .collection('emergencies')
      .orderBy('date')
      .startAfter(new Date().getTime())
      .onSnapshot(e => {
        // TODO filter by department once routing is completed
        const data = _.reverse(
          e.docs.map(e => {
            return {
              ...e.data(),
              id: e.id
            }
          })
        )
        dispatch(createAction(GET_EMERGENCIES)(data))
      })
    return function cleanup() {
      snapshot()
    }
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
