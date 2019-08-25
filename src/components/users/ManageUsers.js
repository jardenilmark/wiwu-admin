import React from 'react'
import { Layout } from 'antd'

import UsersList from './UsersList'

const Responders = () => {
  return (
    <Layout.Content style={styles.content}>
      <UsersList />
    </Layout.Content>
  )
}

const styles = {
  content: {
    height: '100%',
    overflowY: 'auto'
  }
}

export default Responders
