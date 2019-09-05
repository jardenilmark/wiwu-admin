import React, { useState } from 'react'
import { Layout, Drawer, Button, Input, Radio } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { searchResponders } from '../../actions/responder/searchResponders.action'
import { filterResponders } from '../../actions/responder/filterResponders.action'

import CreateResponder from './CreateResponder'
import ResponderList from './ResponderList'

const { Search } = Input

const ManageResponders = () => {
  const dispatch = useDispatch()
  const responders = useSelector(state => state.admin.responders)
  const [radioValue, setRadioValue] = useState('all')
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
          style={{ width: 200 }}
        />
        <Radio.Group
          value={radioValue}
          buttonStyle='solid'
          onChange={e => {
            setRadioValue(e.target.value)
            dispatch(filterResponders(responders, e.target.value))
          }}>
          <Radio.Button value='all'>
            <strong>All</strong>
          </Radio.Button>
          <Radio.Button value='active'>
            <strong>Active</strong>
          </Radio.Button>
          <Radio.Button value='blocked'>
            <strong>Blocked</strong>
          </Radio.Button>
          <Radio.Button value='archived'>
            <strong>Archived</strong>
          </Radio.Button>
        </Radio.Group>
        <Button
          icon='user-add'
          type='dashed'
          onClick={() => setDrawerVisibility(true)}>
          Add Responder
        </Button>
      </div>
      <ResponderList />
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

export default ManageResponders
