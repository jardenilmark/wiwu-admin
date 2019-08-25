import React, { useState } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { signOut } from '../actions/admin/signOut.action'
import { useDispatch } from 'react-redux'
import Logo from './Logo'

const Sidebar = ({ history, location }) => {
  const dispatch = useDispatch()
  const pathname = location.pathname.split('/')[1]
  const selectedKeys = pathname === '' ? ['dashboard'] : [pathname]
  const [collapsed, toggleCollapse] = useState(false)

  return (
    <Layout.Sider
      collapsible
      width={250}
      collapsed={collapsed}
      onCollapse={() => toggleCollapse(!collapsed)}>
      <div style={styles.logoWrapper}>
        <Logo height={70} />
      </div>
      <Menu
        theme='dark'
        mode='inline'
        style={styles.menu}
        selectedKeys={selectedKeys}>
        <Menu.Item
          key='manage-responders'
          onClick={() => history.push('/manage-responders')}>
          <Icon type='safety' />
          <span>Manage Responders</span>
        </Menu.Item>
        <Menu.Item
          key='manage-users'
          onClick={() => history.push('/manage-users')}>
          <Icon type='team' />
          <span>Manage Users</span>
        </Menu.Item>
        <Menu.Item
          key='verification'
          onClick={() => history.push('/verification')}>
          <Icon type='check-circle' />
          <span>User Verification</span>
        </Menu.Item>
        <Menu.Item key='settings' onClick={() => history.push('/settings')}>
          <Icon type='setting' />
          <span>Settings</span>
        </Menu.Item>
        <Menu.Item key='logout' onClick={() => dispatch(signOut())}>
          <Icon type='poweroff' />
          <span>Logout</span>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  )
}

const styles = {
  logoWrapper: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    margin: '35px 0px 20px 0px'
  },
  menu: {
    textAlign: 'left'
  }
}

export default Sidebar
