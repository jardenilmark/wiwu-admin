import React from 'react'
import { Layout, Input } from 'antd'

import UsersList from './UsersList'

const { Search } = Input

const Responders = () => {
  return (
    <Layout.Content style={styles.content}>
      <div style={styles.wrapper}>
        <Search
          placeholder='Search users...'
          onSearch={value => console.log(value)}
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
    marginTop: 30,
    marginBottom: 20,
    textAlign: 'left'
  }
}

export default Responders
