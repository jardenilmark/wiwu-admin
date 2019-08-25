import React, { useState } from 'react'
import { Layout, Drawer, Button, Input } from 'antd'

import CreateResponder from './CreateResponder'
import RespondersList from './RespondersList'

const { Search } = Input

const ManageResponders = () => {
  const [drawerVisibility, setDrawerVisibility] = useState(false)
  return (
    <Layout.Content style={styles.content}>
      <Drawer
        title={<b>Create Responder Administrator</b>}
        width={550}
        destroyOnClose={true}
        maskClosable={false}
        keyboard={false}
        bodyStyle={{ background: 'whitesmoke', height: '94%' }}
        onClose={() => setDrawerVisibility(false)}
        visible={drawerVisibility}>
        <CreateResponder setDrawerVisibility={setDrawerVisibility} />
      </Drawer>
      <div style={styles.wrapper}>
        <Search
          placeholder='Search responder admins...'
          onSearch={value => console.log(value)}
          style={{ width: 300 }}
        />
        <Button
          icon='user-add'
          type='dashed'
          onClick={() => setDrawerVisibility(true)}
          style={{ float: 'right' }}>
          Add Responder
        </Button>
      </div>
      <RespondersList />
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
    marginBottom: 30,
    textAlign: 'left'
  }
}

export default ManageResponders
