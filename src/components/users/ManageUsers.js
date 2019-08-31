import React from 'react'
import { Layout, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { searchUsers } from '../../actions/user/searchUsers.action'

import UsersList from './UsersList'

const { Search } = Input

const Responders = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.admin.users)

  return (
    <Layout.Content style={styles.content}>
      <div style={styles.wrapper}>
        <Search
          placeholder='Search users...'
          onSearch={value => dispatch(searchUsers(users, value))}
          style={{ width: 300 }}
        />
      </div>
      <UsersList />
    </Layout.Content>
  )
}

const styles = {
  content: {
    height: '100%',
    overflowY: 'auto'
  },
  wrapper: {
    width: '70%',
    marginLeft: '15%',
    marginTop: 40,
    marginBottom: 20,
    textAlign: 'left'
  }
}

export default Responders
