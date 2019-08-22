import React from 'react'
import { Card, Row, Col, Tabs } from 'antd'

import LoginTab from './LoginTab'
import SignupTab from './SignupTab'
import Logo from '../Logo'

const { TabPane } = Tabs

const AuthScreen = ({ history, location }) => {
  const pathName = location.pathname
  const paths = pathName.split('/')
  const activeKey = paths.length > 2 ? paths[2] : 'signIn'

  return (
    <Row
      style={{ height: '100vh' }}
      type='flex'
      justify='center'
      align='middle'>
      <Col xs={20} sm={16} md={14} lg={12} xl={10} xxl={7}>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center'
          }}>
          <Logo height={120} />
        </div>
        <Card
          bordered={false}
          style={{
            marginTop: -10,
            backgroundColor: 'whitesmoke'
          }}>
          <Tabs
            activeKey={activeKey}
            onTabClick={key => history.push(`/auth/${key}`)}
            tabBarStyle={{ fontWeight: 'bold', textAlign: 'left' }}
            tabBarGutter={15}>
            <TabPane tab='SIGN IN' key='signIn'>
              <LoginTab />
            </TabPane>
            <TabPane tab='SIGN UP' key='signUp'>
              <SignupTab />
            </TabPane>
          </Tabs>
        </Card>
      </Col>
    </Row>
  )
}

export default AuthScreen
