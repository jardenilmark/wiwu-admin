import React, { Fragment } from 'react'
import { Layout, Menu } from 'antd'

import CreateResponder from './CreateResponderTab'
import ViewResponders from './ViewRespondersTab'

const Responders = ({ history, location }) => {
  const pathname = location.pathname.split('/')[2]
  const selectedKeys =
    pathname === undefined ? ['create-responder'] : [pathname]

  return (
    <Fragment>
      <Layout.Header style={{ padding: 0, height: 45 }}>
        <Menu
          theme='dark'
          selectedKeys={selectedKeys}
          mode='horizontal'
          size='large'
          style={{ display: 'flex', flexDirection: 'row' }}>
          <Menu.Item
            key='create-responder'
            onClick={() => history.push('/manage-responders/create-responder')}>
            Create Responder
          </Menu.Item>
          <Menu.Item
            key='view-responders'
            onClick={() => history.push('/manage-responders/view-responders')}>
            View Responders
          </Menu.Item>
        </Menu>
      </Layout.Header>
      <Layout.Content>
        {selectedKeys[0] === 'create-responder' && (
          <CreateResponder history={history} />
        )}
        {selectedKeys[0] === 'view-responders' && <ViewResponders />}
      </Layout.Content>
    </Fragment>
  )
}

export default Responders
