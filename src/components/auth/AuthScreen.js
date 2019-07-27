import React from 'react'
import { Card, Row, Col } from 'antd'

import LoginScreen from './LoginTab'
import SignUpScreen from './SignupTab'
import Logo from '../Logo'

const tabList = [
  {
    key: 'signIn',
    tab: 'Sign In'
  },
  {
    key: 'signUp',
    tab: 'Sign Up'
  }
]

const contentList = {
  signIn: <LoginScreen />,
  signUp: <SignUpScreen />
}

/**
 * TODO: route should also follow which tab the user is on
 * e.g. Sign up: /auth/signup or /signup
 * e.g. Sign in: /auth/signin or /signin
 */
const AuthScreen = ({ history, location }) => {
  const pathName = location.pathname
  const paths = pathName.split('/')
  const activeTab = paths.length > 2 ? paths[2] : 'signIn'

  return (
    <Row
      style={{ height: '100vh' }}
      type='flex'
      justify='center'
      align='middle'>
      <Col xs={20} sm={16} md={14} lg={12} xl={9} xxl={7}>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center'
          }}>
          <Logo height={90} />
        </div>
        <Card
          bordered={false}
          headStyle={{ textAlign: 'left' }}
          tabList={tabList}
          activeTabKey={activeTab}
          onTabChange={key => {
            history.push(`/auth/${key}`)
          }}>
          {contentList[activeTab]}
        </Card>
      </Col>
    </Row>
  )
}

export default AuthScreen
