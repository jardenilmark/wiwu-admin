import React, { Fragment } from 'react'
import format from 'date-fns/format'
import { useDispatch, useSelector } from 'react-redux'
import {
  Col,
  Button,
  List,
  Divider,
  Modal,
  Avatar,
  Typography,
  message
} from 'antd'

import { completeEmergency } from '../../actions/emergency-request/updateEmergency.action'
import { sendNotification } from '../../helpers/emergency-request/sendNotification'

import placeholder from '../../assets/images/placeholder.png'

import Map from '../Map'

const { Text, Title } = Typography

const EmergencyColumn = props => {
  const { title } = props

  const dispatch = useDispatch()
  const emergencies = useSelector(({ emergency }) =>
    title === 'Completed' ? emergency.completed : emergency.pending
  )

  return (
    <Col span={12} style={{ padding: 40, textAlign: 'center', paddingTop: 20 }}>
      <Title level={2}>{title} Requests</Title>
      <Divider />
      <List
        itemLayout='vertical'
        style={{
          textAlign: 'left',
          height: '800px',
          overflow: 'auto'
          // backgroundColor: 'red'
        }}
        pagination={{
          pageSize: 3
        }}
        split
        dataSource={emergencies}
        renderItem={emergency => (
          <List.Item
            extra={
              <Fragment>
                <Map
                  location={emergency.location}
                  style={{ width: '400px', height: '250px' }}
                />
                <div
                  style={{
                    marginTop: '10px',
                    textAlign: 'right',
                    marginRight: '10px'
                  }}>
                  <Button
                    type='dashed'
                    style={{ fontSize: '20px' }}
                    icon='info'
                    onClick={() =>
                      Modal.confirm({
                        width: 300,
                        centered: true,
                        title: 'CONFIRMATION',
                        content: 'Are you sure you want to broadcast?',
                        okText: 'Confirm',
                        cancelText: 'Cancel',
                        onOk: () => {
                          dispatch(completeEmergency(emergency.id))
                          message.success(
                            'Emergency has been marked completed!',
                            2
                          )
                        }
                      })
                    }
                  />
                  {title === 'Pending' && (
                    <Fragment>
                      <Button
                        type='dashed'
                        style={{ fontSize: '20px' }}
                        icon='sound'
                        onClick={() =>
                          Modal.confirm({
                            width: 300,
                            centered: true,
                            title: 'CONFIRMATION',
                            content: 'Are you sure you want to broadcast?',
                            okText: 'Confirm',
                            cancelText: 'Cancel',
                            onOk: () => {
                              sendNotification({
                                app_id: '99a5a234-ed7d-48a6-9738-4cf5a7a4fbec',
                                contents: {
                                  en: 'An emergency is near your area!'
                                },
                                android_group: ['All'],
                                filters: [
                                  {
                                    field: 'location',
                                    radius: '1000', // within 1000 meters
                                    lat: emergency.location.latitude,
                                    long: emergency.location.longitude
                                  }
                                ]
                              })
                              message.success('Emergency was broadcast', 2)
                            }
                          })
                        }
                      />
                      <Button
                        type='dashed'
                        style={{ fontSize: '20px' }}
                        icon='arrow-right'
                        onClick={() =>
                          Modal.confirm({
                            width: 300,
                            centered: true,
                            title: 'CONFIRMATION',
                            content: 'Are you sure you want to broadcast?',
                            okText: 'Confirm',
                            cancelText: 'Cancel',
                            onOk: () => {
                              dispatch(completeEmergency(emergency.id))
                              message.success(
                                'Emergency has been marked completed!',
                                2
                              )
                            }
                          })
                        }
                      />
                    </Fragment>
                  )}
                </div>
              </Fragment>
            }>
            <List.Item.Meta
              // avatar={<Avatar src={require(`../../assets/images/${item.department}.png`)} size={90}/>}
              title={
                <Fragment>
                  <Title level={4} style={{ margin: 0 }}>
                    Request for {emergency.department} assistance
                  </Title>
                  <Text type='secondary'>{emergency.description}</Text>
                </Fragment>
              }
              description={
                <Fragment>
                  <Text strong>Sent by:</Text>
                  <br />
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={emergency.user.avatar}
                        size={50}
                        style={{ marginTop: '10px' }}
                      />
                    }
                    title={
                      <Fragment>
                        <Text strong>{emergency.user.name}</Text>
                        <br />
                        <Text type='secondary'>
                          {emergency.user.phoneNumber}
                        </Text>
                        <br />
                        <Text>
                          {format(
                            emergency.date.toDate(),
                            'MMMMMM d, yyyy - hh:mm a'
                          )}
                        </Text>
                      </Fragment>
                    }
                  />
                </Fragment>
              }
            />
          </List.Item>
        )}
      />
    </Col>
  )
}

export default EmergencyColumn
