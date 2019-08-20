import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { logout } from '../actions/user/logout.action'
import Logo from './Logo'
import { useDispatch } from 'react-redux'
import VideoVerification from './VideoVerification'

const Dashboard = () => {
  const dispatch = useDispatch()
  return (
    <Layout>
      <Layout.Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0
        }}>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            margin: '35px 0px 20px 0px'
          }}>
          <Logo height={70} />
        </div>
        <Menu theme='dark' mode='inline' defaultSelectedKeys={['4']}>
          <Menu.Item key='dashboard'>
            <Icon type='appstore-o' />
            <span className='nav-text'>Dashboard</span>
          </Menu.Item>
          <Menu.Item key='contacts'>
            <Icon type='team' />
            <span className='nav-text'>Contacts</span>
          </Menu.Item>
          <Menu.Item key='history'>
            <Icon type='history' />
            <span className='nav-text'>History</span>
          </Menu.Item>
          <Menu.Item key='logout' onClick={e => dispatch(logout())}>
            <Icon type='poweroff' />
            <span className='nav-text'>Logout</span>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Layout.Header style={{ background: '#fff', padding: 0 }} />
        <Layout.Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
            Hello, world!
            <VideoVerification />
          </div>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>
          wiwu-admin ©2019 created by timwiwu
        </Layout.Footer>
      </Layout>
    </Layout>
  )
}

export default Dashboard
