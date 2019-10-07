import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Table, Button, Divider, Tag, Input } from 'antd'
import { getToken } from '../actions/twilio/getToken.action'
import { getUsers } from '../actions/user/getUsers.action'
import { searchUsers } from '../actions/user/searchUsers.action'
import TwilioVideo from '../components/verification/TwilioVideo'
import IdModal from '../components/verification/IdModal'
import Spinner from '../components/Spinner'
import { Helmet } from 'react-helmet'

const { Search } = Input

const UserVerification = () => {
  const identity = 'Admin'
  const [record, setRecord] = useState({})
  const [fetching, setFetchingStatus] = useState(true)
  const [isIdModalVisible, toggleIdModal] = useState(false)
  const pendingUsers = useSelector(state =>
    state.admin.users.filter(
      user => user.isUserVerified === false && user.status === 'active'
    )
  )
  const filteredUsers = useSelector(state => state.admin.filteredUsers)
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchData() {
      await dispatch(getUsers())
      setFetchingStatus(false)
    }
    fetchData()
  })

  if (fetching) {
    return <Spinner tip='Fetching pending users...' height='100%' />
  }

  const renderActions = (text, record) => (
    <span>
      <Button
        icon='video-camera'
        type='dashed'
        onClick={() => {
          setRecord(record)
          dispatch(getToken(identity, record.id))
        }}
        disabled={!record.joinedRoom}>
        Join Room
      </Button>
      <Divider type='vertical' />
      <Button
        type='dashed'
        icon='idcard'
        onClick={() => {
          setRecord(record)
          toggleIdModal(true)
        }}
        disabled={!record.idImage}>
        View ID
      </Button>
    </span>
  )

  const renderTags = (text, record) => (
    <span>
      <Tag color={record.joinedRoom ? 'green' : 'red'} key={record.joinedRoom}>
        {record.joinedRoom ? 'Available Video' : 'Unavailable Video'}
      </Tag>
      <Tag color={record.idImage ? 'green' : 'red'} key={record.idImage}>
        {record.idImage ? 'Available ID' : 'Unavailable ID'}
      </Tag>
    </span>
  )

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
      render: (text, record) => renderTags(text, record)
    },
    {
      render: (text, record) => renderActions(text, record)
    }
  ]

  return (
    <Fragment>
      <Helmet>
        <title>User Verification - wiwu admin</title>
      </Helmet>

      <div style={{ width: '70%', margin: '0 auto', height: '100%' }}>
        <Row>
          <div style={{ float: 'left', margin: '25px 0px 20px' }}>
            <Search
              placeholder='Search users...'
              onSearch={value => dispatch(searchUsers(pendingUsers, value))}
              style={{ width: 300 }}
            />
          </div>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              dataSource={filteredUsers || pendingUsers}
              pagination={{
                pageSize: 15,
                hideOnSinglePage: true,
                size: 'small'
              }}
              columns={columns}
              rowKey='id'
            />
          </Col>
        </Row>
      </div>
      <TwilioVideo record={record} />
      <IdModal
        record={record}
        isIdModalVisible={isIdModalVisible}
        toggleIdModal={toggleIdModal}
      />
    </Fragment>
  )
}

export default UserVerification
