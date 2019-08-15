import React from 'react'
import { Card, Row, Col, Button } from 'antd'
import { logout } from '../../actions/user/logout.action'
import { useDispatch } from 'react-redux'
import Logo from '../Logo'

const { Meta } = Card

const VerifyScreen = () => {
  const dispatch = useDispatch()
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
          <Logo height={90} />
        </div>
        <Card
          bordered={false}
          actions={[
            <Button type='dashed'>Resend Verification Email</Button>,
            <Button type='dashed' onClick={() => dispatch(logout())}>
              Go Back to Sign In Page
            </Button>
          ]}
          style={{ backgroundColor: 'whitesmoke' }}>
          <Meta
            title='Your account is not yet verified!'
            description='Please check your email if you have received the verification link we sent you.'
          />
        </Card>
      </Col>
    </Row>
  )
}

export default VerifyScreen
