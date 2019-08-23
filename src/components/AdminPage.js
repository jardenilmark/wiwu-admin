import React from 'react'
import { Layout } from 'antd'

import Sidebar from './Sidebar'

const AdminPage = ({ history, location, component: Component }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar history={history} location={location} />
      <Layout>
        <Component history={history} location={location} />
        <Layout.Footer style={{ textAlign: 'center' }}>
          wiwu-admin ©2019 created by timwiwu
        </Layout.Footer>
      </Layout>
    </Layout>
  )
}

export default AdminPage
