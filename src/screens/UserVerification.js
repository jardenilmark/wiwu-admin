import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Table, Button, Input } from 'antd'
import { getToken } from '../actions/twilio/getToken.action'
import { getUsers } from '../actions/user/getUsers.action'
import { searchUsers } from '../actions/user/searchUsers.action'
import TwilioVideo from '../components/verification/TwilioVideo'
import IdModal from '../components/verification/IdModal'
import Spinner from '../components/Spinner'
import { Helmet } from 'react-helmet'
import { isBeingVerified } from '../actions/user/isBeingVerified.action'

const { Search } = Input

const UserVerification = () => {
  const identity = 'Admin'
  const [record, setRecord] = useState({})
  const [fetching, setFetchingStatus] = useState(true)
  const [isIdModalVisible, toggleIdModal] = useState(false)
  const pendingUsers = useSelector(state =>
    state.admin.users.filter(
      user =>
        !user.isUserVerified &&
        user.status === 'active' &&
        !user.isBeingVerified
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
    return <Spinner tip='Fetching pending users...' height={700} />
  }

  const renderActions = (text, record) => (
    <span>
      {record.hasValidId ? (
        <Button
          icon='video-camera'
          type={record.joinedRoom ? 'primary' : 'dashed'}
          onClick={() => {
            setRecord(record)
            dispatch(isBeingVerified(record.id, true))
            dispatch(getToken(identity, record.id))
          }}
          disabled={!record.joinedRoom}
          style={{ margin: '8px' }}>
          Join Room
        </Button>
      ) : (
        <Button
          icon='idcard'
          type={record.idImage ? 'primary' : 'dashed'}
          onClick={() => {
            setRecord(record)
            dispatch(isBeingVerified(record.id, true))
            toggleIdModal(true)
          }}
          disabled={!record.idImage}
          style={{ margin: '8px' }}>
          View ID
        </Button>
      )}
    </span>
  )

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      sorter: (a, b) =>
        a.firstName.toUpperCase() < b.firstName.toUpperCase()
          ? -1
          : a.firstName.toUpperCase() > b.firstName.toUpperCase()
          ? 1
          : 0,
      defaultSortOrder: 'ascend',
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      sorter: (a, b) =>
        a.lastName.toUpperCase() < b.lastName.toUpperCase()
          ? -1
          : a.lastName.toUpperCase() > b.lastName.toUpperCase()
          ? 1
          : 0,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => renderActions(text, record),
      filters: [
        {
          text: 'Video',
          value: 'video'
        },
        {
          text: 'ID',
          value: 'id'
        }
      ],
      filterMultiple: true,
      onFilter: (value, record) => {
        if (value === 'video' && record.joinedRoom) {
          return true
        } else if (value === 'id' && record.idImage && !record.hasValidId) {
          return true
        } else {
          return false
        }
      }
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
