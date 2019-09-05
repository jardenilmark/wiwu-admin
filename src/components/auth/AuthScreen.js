import React, { useState } from 'react'
import { Card, Row, Col, Tabs } from 'antd'

import SignInTab from './SignInTab'
import SignUpTab from './SignUpTab'
import Logo from '../Logo'

const { TabPane } = Tabs

const AuthScreen = ({ history }) => {
  const pathname = window.location.pathname
  const paths = pathname.split('/')
  const [activeKey, setActiveKey] = useState(paths[2])

  return (
    <Row style={styles.row} type='flex' justify='center' align='middle'>
      <Col xs={20} sm={16} md={14} lg={12} xl={10} xxl={7}>
        <div style={styles.logoWrapper}>
          <Logo height={120} />
        </div>
        <Card bordered={false} style={styles.card}>
          <Tabs
            activeKey={activeKey}
            onTabClick={key => {
              setActiveKey(key)
              history.push(`/auth/${key}`)
            }}
            tabBarStyle={styles.tabBar}
            tabBarGutter={15}>
            <TabPane tab='SIGN IN' key='signIn'>
              <SignInTab />
            </TabPane>
            <TabPane tab='SIGN UP' key='signUp'>
              <SignUpTab />
            </TabPane>
          </Tabs>
        </Card>
      </Col>
    </Row>
  )
}

const styles = {
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    marginTop: -10,
    backgroundColor: '#f5f5f5'
  },
  tabBar: {
    fontWeight: 'bold',
    textAlign: 'left'
  },
  row: {
    height: '100vh'
  }
}

export default AuthScreen
