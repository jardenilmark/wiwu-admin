import React, { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../../actions/user/fetchUsers.action'
import { deleteUser } from '../../actions/user/deleteUser.action'
import { statuses } from '../../constants/User'
import { List, Avatar, Icon, Tag, Popconfirm, Spin } from 'antd'

const UsersList = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.user.users)
  const [fetching, setFetchingStatus] = useState(true)

  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchUsers())
      setFetchingStatus(false)
    }

    fetchData()
  }, [])

  if (fetching) {
    return (
      <div style={styles.spinnerWrapper}>
        <Spin
          indicator={<Icon type='loading' style={styles.indicator} spin />}
          tip={<span style={styles.tip}>Fetching users...</span>}
        />
      </div>
    )
  }

  return (
    <div style={styles.listWrapper}>
      <List
        style={{ width: '70%', textAlign: 'left' }}
        itemLayout='horizontal'
        pagination={{ pageSize: 10, hideOnSinglePage: true, size: 'small' }}
        dataSource={users}
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
  spinnerWrapper: {
    height: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  indicator: {
    fontSize: 40,
    marginBottom: 15
  },
  tip: {
    fontSize: 16
  }
}

export default UsersList
