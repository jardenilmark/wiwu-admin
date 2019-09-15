import React, { useState } from 'react'
import { Layout, Drawer } from 'antd'

import ContactList from './ContactList'
import CreateContactForm from './CreateContactForm'
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
        <CreateContactForm setDrawerVisibility={setDrawerVisibility} />
      </Drawer>
      <ContactListHeader setDrawerVisibility={setDrawerVisibility} />
      <ContactList />
    </Layout.Content>
  )
}

const styles = {
  content: {
    height: '100%',
    overflowY: 'auto'
  }
}

export default ManageContacts
