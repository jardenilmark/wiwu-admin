import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Row, Col, Table, Button, Divider } from 'antd'
import { getToken } from '../../actions/twilio/getToken.action'
import TwilioVideo from '../TwilioVideo'

const UserVerification = () => {
  // todo change to admin.current.displayName or something
  const identity = 'Admin'
  const [record, setRecord] = useState({})
  const dispatch = useDispatch()

  const renderActions = (text, record) => (
    <span>
      <Button
        icon='video-camera'
        size='small'
        onClick={() => {
          setRecord(record)
          dispatch(getToken(identity, record.email))
        }}>
        Join Room
      </Button>
      <Divider type='vertical' />
      <Button size='small' icon='video-camera' onClick={() => {}}>
        Verify ID
      </Button>
    </span>
  )

  const sampleData = [
    {
      firstName: 'Luca',
      lastName: 'Brasi',
      phoneNumber: '09773513562',
      email: 'jevi.lanchinebre@gmail.com'
    },
    {
      firstName: 'Vito',
      lastName: 'Corleone',
      phoneNumber: '09773513562',
      email: 'jvcl1225@gmail.com'
    }
  ]
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName'
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName'
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => renderActions(text, record)
    }
  ]
  return (
    <div>
      <Row style={{ margin: '8px' }}>
        <Col span={24}>
          <Table
            dataSource={sampleData}
            columns={columns}
            rowKey='email'
            title={() => 'Pending Verifications'}
          />
        </Col>
      </Row>
      <TwilioVideo record={record} />
    </div>
  )
}

export default UserVerification
