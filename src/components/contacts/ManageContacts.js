import React, { useState } from 'react'
import { Layout, Drawer } from 'antd'

import ContactsList from './ContactList'
import CreateContact from './CreateContact'
import ContactListHeader from './ContactListHeader'

const ManageContacts = () => {
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
      <ContactListHeader setDrawerVisibility={setDrawerVisibility} />
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
    marginBottom: 30,
    display: 'flex',
    justifyContent: 'space-between'
  }
}

export default ManageContacts
