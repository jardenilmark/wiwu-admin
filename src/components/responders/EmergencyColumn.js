import React from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Col, Descriptions, List, PageHeader, Modal } from 'antd'

import { completeEmergency } from '../../actions/emergency/updateEmergency.action'

import Map from '../Map'

const EmergencyColumn = props => {
  const { title } = props

  const dispatch = useDispatch()
  const emergencies = useSelector(state =>
    title === 'COMPLETED' ? state.emergency.completed : state.emergency.pending
  )

  return (
    <Col span={12} style={{ padding: 10, height: '90vh' }}>
      <div
        style={{
          overflow: 'auto',
          height: '100%',
          width: '100%'
        }}>
        <PageHeader title={title} />
        <List
          itemLayout='vertical'
          size='large'
          pagination={{
            simple: 'true',
            pageSize: 2
          }}
          dataSource={emergencies}
          renderItem={item => (
            <Card
              title={item.id}
              key={item.id}
              cover={
                <img
                  width={210}
                  height={250}
                  alt='logo'
                  src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' // PLACEHOLDER
                />
              }
              extra={
                title === 'COMPLETED'
                  ? [
                      <Button
                        icon='global'
                        key={`${item.id}globalcompleted`}
                        shape='round'
                        onClick={() =>
                          Modal.info({
                            width: 720,
                            title: 'USER LOCATION',
                            content: <Map location={item.location} />
                          })
                        }
                      />
                    ]
                  : [
                      <Button
                        icon='global'
                        shape='round'
                        key={`${item.id}globalpending`}
                        onClick={() =>
                          Modal.info({
                            width: 720,
                            title: 'USER LOCATION',
                            content: <Map location={item.location} />
                          })
                        }
                      />,
                      <Button
                        icon='arrow-right'
                        shape='round'
                        key={`${item.id}arrowpending`}
                        onClick={() => dispatch(completeEmergency(item.id))}
                      />
                    ]
              }
              style={{ marginBottom: 10 }}>
              <List.Item key={item.title}>
                <Descriptions bordered size={'middle'} layout={'vertical'}>
                  <Descriptions.Item label='Name' span={2}>
                    {item.name}
                  </Descriptions.Item>
                  <Descriptions.Item label='Role'>
                    {item.role}
                  </Descriptions.Item>
                  <Descriptions.Item label='Phone Number'>
                    {item.phoneNumber}
                  </Descriptions.Item>
                  <Descriptions.Item label='time'>
                    {moment(new Date(item.date.toDate())).format('LT')}
                  </Descriptions.Item>
                  <Descriptions.Item label='Date' span={2}>
                    {moment(new Date(item.date.toDate())).format('MM/DD/YYYY')}
                  </Descriptions.Item>
                  <Descriptions.Item label='Address' span={3}>
                    {item.address || 'Not Specified'}
                  </Descriptions.Item>
                  <Descriptions.Item label='Comments' span={3}>
                    {item.comments || 'Not Specified'}
                  </Descriptions.Item>
                </Descriptions>
              </List.Item>
            </Card>
          )}
        />
      </div>
    </Col>
  )
}

export default EmergencyColumn
