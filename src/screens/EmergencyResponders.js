import React, { useState } from 'react'
import { Layout, Drawer } from 'antd'

import CreateResponder from '../components/emergency-responder/CreateResponder'
import ResponderList from '../components/emergency-responder/ResponderList'
import ResponderListHeader from '../components/emergency-responder/ResponderListHeader'

const EmergencyResponders = () => {
  const [drawerVisibility, setDrawerVisibility] = useState(false)

  return (
    <Layout.Content style={styles.content}>
      <Drawer
        title={<b>Create Emergency Responder</b>}
        width={550}
        destroyOnClose={true}
        maskClosable={false}
        keyboard={false}
        bodyStyle={{ background: '#f5f5f5', height: '94%' }}
        onClose={() => setDrawerVisibility(false)}
        visible={drawerVisibility}>
        <CreateResponder setDrawerVisibility={setDrawerVisibility} />
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

export default EmergencyResponders
