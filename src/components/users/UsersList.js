import React, { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../../actions/user/fetchUsers.action'
import { deleteUser } from '../../actions/user/deleteUser.action'
import { statuses } from '../../constants/User'
import {
  List,
  Avatar,
  Icon,
  Tag,
  Popconfirm,
  Tooltip,
  Modal,
  Typography
} from 'antd'

import Spinner from '../Spinner'
import Map from '../Map'

const { Text } = Typography

const UsersList = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.admin.users)
  const filteredUsers = useSelector(state => state.admin.filteredUsers)
  const [fetching, setFetchingStatus] = useState(true)

  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchUsers())
      setFetchingStatus(false)
    }

    fetchData()
  }, [])

  if (fetching) {
    return <Spinner tip='Fetching Users...' height={700} />
  }

  return (
    <div style={styles.listWrapper}>
      <List
        style={styles.list}
        itemLayout='horizontal'
        pagination={{ pageSize: 9, hideOnSinglePage: true, size: 'small' }}
        dataSource={filteredUsers || users}
        renderItem={user => {
          const color = user.status === statuses.ACTIVE ? 'green' : 'red'

          return (
            <List.Item
              actions={[
                <Tooltip placement='left' title='Archive User'>
                  <Popconfirm
                    placement='top'
                    title='Are you sure you want to archive this contact?'
                    onConfirm={() => dispatch(deleteUser(user.id))}
                    okText='Yes'
                    cancelText='No'>
                    <Icon type='history' style={{ fontSize: 18 }} />
                  </Popconfirm>
                </Tooltip>,
                <Tooltip placement='left' title='Show Location'>
                  <Icon
                    type='environment'
                    style={{ fontSize: 18 }}
                    onClick={() => {
                      Modal.info({
                        title: (
                          <div>
                            <Text strong>
                              {user.firstName} {user.lastName}{' '}
                            </Text>
                            <br />
                            <Text type='secondary'>{user.address}</Text>
                          </div>
                        ),
                        width: 660,
                        icon: null,
                        keyboard: false,
                        maskClosable: false,
                        okText: 'Close',
                        okType: 'danger',
                        content: <Map location={user.homeCoordinates} />
                      })
                    }}
                  />
                </Tooltip>
              ]}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={require('../../assets/images/user-avatar.png')}
                  />
                }
                title={
                  <b>
                    {user.firstName} {user.lastName} |{' '}
                    <Tag color={color}>{user.status.toUpperCase()}</Tag>
                  </b>
                }
                description={
                  <Fragment>
                    <span>{user.phoneNumber}</span>
                  </Fragment>
                }
              />
            </List.Item>
          )
        }}
      />
    </div>
  )
}

const styles = {
  listWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  list: {
    width: '70%',
    textAlign: 'left'
  }
}

export default UsersList
