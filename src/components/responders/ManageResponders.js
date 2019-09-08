import React, { useState } from 'react'
import { Layout, Drawer } from 'antd'

import CreateResponderForm from './CreateResponderForm'
import ResponderList from './ResponderList'
import ResponderListHeader from './ResponderListHeader'

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
        bodyStyle={{ background: '#f5f5f5', height: '94%' }}
        onClose={() => setDrawerVisibility(false)}
        visible={drawerVisibility}>
        <CreateResponderForm setDrawerVisibility={setDrawerVisibility} />
      </Drawer>
      <ResponderListHeader setDrawerVisibility={setDrawerVisibility} />
      <ResponderList />
    </Layout.Content>
  )
}

const styles = {
  content: {
    height: '100%',
    overflowY: 'auto'
  }
}

export default ManageResponders
