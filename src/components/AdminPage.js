import React from 'react'
import { Layout } from 'antd'

import Sidebar from './Sidebar'
import ManageResponders from './responders/ManageResponders'
import VideoVerification from './VideoVerification'
import ManageUsers from './users/ManageUsers'
import NoMatch from './NoMatch'

const getComponentToRender = pathname => {
  switch (pathname) {
    case 'manage-responders':
      return <ManageResponders />
    case 'verification':
      return <VideoVerification />
    case 'manage-users':
      return <ManageUsers />
    default:
      return <NoMatch />
  }
}

const AdminPage = ({ history, location }) => {
  const pathname = location.pathname.split('/')[1]
  const Component = getComponentToRender(pathname)
  return (
    <Layout style={styles.layout}>
      <Sidebar history={history} location={location} />
      <Layout>
        {Component}
        <Layout.Footer style={styles.footer}>
          wiwu-admin ©2019 created by timwiwu
        </Layout.Footer>
      </Layout>
    </Layout>
  )
}

const styles = {
  layout: {
    height: '100vh'
  },
  footer: {
    textAlign: 'center'
  }
}

export default AdminPage
