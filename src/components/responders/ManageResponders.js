import React from 'react'
import { Layout, Collapse, Divider } from 'antd'

import CreateResponder from './CreateResponder'
import ViewResponders from './RespondersList'

const { Panel } = Collapse

const ManageResponders = () => {
  return (
    <Layout.Content style={styles.content}>
      <div style={styles.collapseWrapper}>
        <Collapse defaultActiveKey={['1']} style={styles.collapse}>
          <Panel key='1' header='Add New Responder'>
            <CreateResponder />
          </Panel>
        </Collapse>
      </div>
      <div style={styles.dividerWrapper}>
        <Divider>
          <b>EMERGENCY RESPONSE ADMINISTRATORS</b>
        </Divider>
      </div>
      <ViewResponders />
    </Layout.Content>
  )
}

const styles = {
  content: {
    height: '100%',
    overflowY: 'auto'
  },
  dividerWrapper: {
    width: '90%',
    marginLeft: '5%'
  },
  collapseWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  collapse: {
    width: '90%',
    textAlign: 'left'
  }
}

export default ManageResponders
