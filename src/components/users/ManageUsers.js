import React from 'react'
import { Layout } from 'antd'

import UserList from './UserList'
import UserListHeader from './UserListHeader'

const ManageUsers = () => {
  return (
    <Layout.Content style={styles.content}>
      <UserListHeader />
      <UserList />
    </Layout.Content>
  )
}

const styles = {
  content: {
    height: '100%',
    overflowY: 'auto'
  }
}

export default ManageUsers
