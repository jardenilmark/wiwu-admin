import React, { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../../actions/user/fetchUsers.action'
import { deleteUser } from '../../actions/user/deleteUser.action'
import { statuses } from '../../constants/User'
import { List, Avatar, Icon, Tag, Popconfirm } from 'antd'

import Spinner from '../Spinner'

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
    return <Spinner tip='Fetching Users...' />
  }

  return (
    <div style={styles.listWrapper}>
      <List
        style={styles.list}
        itemLayout='horizontal'
        pagination={{ pageSize: 9, hideOnSinglePage: true, size: 'small' }}
        dataSource={filteredUsers ? filteredUsers : users}
        renderItem={user => {
          const color = user.status === statuses.ACTIVE ? 'green' : 'red'
          return (
            <List.Item
              actions={[
                <Popconfirm
                  placement='top'
                  title='Are you sure you want to delete this user?'
                  onConfirm={() => dispatch(deleteUser(user.id))}
                  okText='Yes'
                  cancelText='No'>
                  <Icon type='delete' style={{ fontSize: 18 }} />
                </Popconfirm>
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
