import React, { useState } from 'react'
import { Layout, Drawer, Button, Input } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { searchResponders } from '../../actions/responder/searchResponders'

import CreateResponder from './CreateResponder'
import RespondersList from './RespondersList'

const { Search } = Input

const ManageResponders = () => {
  const dispatch = useDispatch()
  const responders = useSelector(state => state.admin.responders)
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
        <CreateResponder setDrawerVisibility={setDrawerVisibility} />
      </Drawer>
      <div style={styles.wrapper}>
        <Search
          placeholder='Search responder admins...'
          onSearch={value => dispatch(searchResponders(responders, value))}
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
