import React, { useState } from 'react'
import { Layout, Input, Button, Drawer } from 'antd'

import ContactsList from './ContactsList'
import CreateContact from './CreateContact'

const { Search } = Input

const Responders = () => {
  const [drawerVisibility, setDrawerVisibility] = useState(false)

  return (
    <Layout.Content style={styles.content}>
      <Drawer
        title={<b>Create Contact</b>}
        width={550}
        destroyOnClose={true}
        maskClosable={false}
        keyboard={false}
        bodyStyle={{ background: '#f5f5f5', height: '94%' }}
        onClose={() => setDrawerVisibility(false)}
        visible={drawerVisibility}>
        <CreateContact setDrawerVisibility={setDrawerVisibility} />
      </Drawer>
      <div style={styles.wrapper}>
        <Search
          placeholder='Search contacts...'
          onSearch={value => console.log(value)}
          style={{ width: 300 }}
        />
        <Button
          icon='plus'
          type='dashed'
          onClick={() => setDrawerVisibility(true)}
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
    marginTop: 40,
    marginBottom: 20,
    textAlign: 'left'
  }
}

export default Responders
