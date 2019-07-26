import React from 'react'
import { Card, Row, Col } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import LoginScreen from './LoginScreen'
import SignUpScreen from './SignUpScreen'
import { changeActiveTab } from '../actions/user/userNavCard.actions'

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

const ScreenNavigation = () => {
  const dispatch = useDispatch()
  const activeTab = useSelector(state => state.navigation.activeTabKey)
  return (
    <div style={{ height: 900 }}>
      <Row type='flex' align='middle'>
        <Col span={8} offset={8}>
          <Card
            headStyle={{ textAlign: 'left' }}
            tabList={tabList}
            activeTabKey={activeTab}
            onTabChange={key => {
              dispatch(changeActiveTab(key))
            }}>
            {contentList[activeTab]}
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ScreenNavigation
