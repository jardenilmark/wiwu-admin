import React from 'react'
import { Card, Row, Col } from 'antd'

import LoginTab from './LoginTab'
import SignupTab from './SignupTab'
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
  signIn: <LoginTab />,
  signUp: <SignupTab />
}

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
      <Col xs={20} sm={16} md={14} lg={12} xl={10} xxl={8}>
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
