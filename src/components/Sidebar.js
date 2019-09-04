import React, { useState } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { signOut } from '../actions/admin/signOut.action'
import { history } from '../history'
import { useDispatch } from 'react-redux'
import Logo from './Logo'

const Sidebar = () => {
  const dispatch = useDispatch()
  const [collapsed, toggleCollapse] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState([
    window.location.pathname.slice(1)
  ])

  return (
    <Layout.Sider
      collapsible
      width={220}
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
          onClick={() => {
            history.push('/manage-responders')
            setSelectedKeys(['manage-responders'])
          }}>
          <Icon type='alert' />
          <span>Manage Responders</span>
        </Menu.Item>
        <Menu.Item
          key='manage-users'
          onClick={() => {
            history.push('/manage-users')
            setSelectedKeys(['manage-users'])
          }}>
          <Icon type='team' />
          <span>Manage Users</span>
        </Menu.Item>
        <Menu.Item
          key='manage-contacts'
          onClick={() => {
            history.push('/manage-contacts')
            setSelectedKeys(['manage-contacts'])
          }}>
          <Icon type='phone' />
          <span>Manage Contacts</span>
        </Menu.Item>
        <Menu.Item
          key='verification'
          onClick={() => {
            history.push('/verification')
            setSelectedKeys(['verification'])
          }}>
          <Icon type='check-circle' />
          <span>User Verification</span>
        </Menu.Item>
        <Menu.Item
          key='settings'
          onClick={() => {
            history.push('/settings')
            setSelectedKeys(['settings'])
          }}>
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
