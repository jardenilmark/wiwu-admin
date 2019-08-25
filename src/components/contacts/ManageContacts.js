import React from 'react'
import { Layout, Input, Button } from 'antd'

import ContactsList from './ContactsList'

const { Search } = Input

const Responders = () => {
  return (
    <Layout.Content style={styles.content}>
      <div style={styles.wrapper}>
        <Search
          placeholder='Search contacts...'
          onSearch={value => console.log(value)}
          style={{ width: 300 }}
        />
        <Button
          icon='plus'
          type='dashed'
          // onClick={() => setDrawerVisibility(true)}
          style={{ float: 'right' }}>
          Add Contact
        </Button>
      </div>
      <ContactsList />
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
