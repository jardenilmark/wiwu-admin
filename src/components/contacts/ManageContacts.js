import React, { useState } from 'react'
import { Layout, Input, Button, Drawer, Radio } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { searchContacts } from '../../actions/contact/searchContacts.action'
import { filterContacts } from '../../actions/contact/filterContacts.action'

import ContactsList from './ContactList'
import CreateContact from './CreateContact'

const { Search } = Input

const Responders = () => {
  const dispatch = useDispatch()
  const contacts = useSelector(state => state.admin.contacts)
  const [radioValue, setRadioValue] = useState('all')
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
          onSearch={value => {
            setRadioValue('all')
            dispatch(searchContacts(contacts, value))
          }}
          style={{ width: 200 }}
        />
        <Radio.Group
          value={radioValue}
          buttonStyle='solid'
          onChange={e => {
            setRadioValue(e.target.value)
            dispatch(filterContacts(contacts, e.target.value))
          }}>
          <Radio.Button value='all'>
            <strong>All</strong>
          </Radio.Button>
          <Radio.Button value='police'>
            <strong>Police</strong>
          </Radio.Button>
          <Radio.Button value='medical'>
            <strong>Medical</strong>
          </Radio.Button>
          <Radio.Button value='fire'>
            <strong>Fire</strong>
          </Radio.Button>
        </Radio.Group>
        <Button
          icon='plus'
          type='dashed'
          onClick={() => setDrawerVisibility(true)}
          style={{ float: 'right', width: 180 }}>
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
    marginBottom: 30,
    display: 'flex',
    justifyContent: 'space-between'
  }
}

export default Responders
