import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Table, Button, Divider } from 'antd'
import { getToken } from '../../actions/twilio/getToken.action'
import { getUsers } from '../../actions/user/getUsers.action'
import TwilioVideo from '../TwilioVideo'
import Spinner from '../Spinner'

const UserVerification = () => {
  // todo change to admin.current.displayName or something
  const identity = 'Admin'
  const [record, setRecord] = useState({})
  const [fetching, setFetchingStatus] = useState(true)
  const pendingUsers = useSelector(state =>
    state.admin.users.filter(
      user => user.isUserVerified === false && user.status === 'active'
    )
  )
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchData() {
      await dispatch(getUsers())
      setFetchingStatus(false)
    }
    fetchData()
  })

  if (fetching) {
    return <Spinner tip='Fetching pending users...' height={700} />
  }

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
        View ID
      </Button>
    </span>
  )
  //  todo: remove after testing purposes
  // const sampleData = [
  //   {
  //     firstName: 'Luca',
  //     lastName: 'Brasi',
  //     phoneNumber: '09773513562',
  //     email: 'jevi.lanchinebre@gmail.com'
  //   }
  // ]
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
            dataSource={pendingUsers}
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
