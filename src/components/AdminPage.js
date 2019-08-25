import React from 'react'
import { Layout } from 'antd'

import Sidebar from './Sidebar'
import ResponderScreen from './responders/RespondersScreen'
import VideoVerification from './VideoVerification'
import NoMatch from './NoMatch'

const getComponentToRender = pathname => {
  switch (pathname) {
    case 'manage-responders':
      return <ResponderScreen />
    case 'verification':
      return <VideoVerification />
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
