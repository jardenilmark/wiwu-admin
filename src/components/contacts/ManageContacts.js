import React, { useState } from 'react'
import { Layout, Input, Button, Drawer } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { searchContacts } from '../../actions/contact/searchContacts.action'

import ContactsList from './ContactsList'
import CreateContact from './CreateContact'

const { Search } = Input

const Responders = () => {
  const dispatch = useDispatch()
  const contacts = useSelector(state => state.contact.contacts)
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
          onSearch={value => dispatch(searchContacts(contacts, value))}
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
