import React from 'react'
import { Card, Row, Col, Button } from 'antd'
import { useDispatch } from 'react-redux'
import { signOut } from '../../actions/admin/signOut.action'
import Logo from '../Logo'

const { Meta } = Card

const UnverifiedScreen = () => {
  const dispatch = useDispatch()
  return (
    <Row style={styles.row} type='flex' justify='center' align='middle'>
      <Col xs={20} sm={16} md={14} lg={12} xl={10} xxl={7}>
        <div style={styles.logoWrapper}>
          <Logo height={90} />
        </div>
        <Card
          bordered={false}
          actions={[
            <Button type='dashed'>Resend Verification Email</Button>,
            <Button type='dashed' onClick={() => dispatch(signOut())}>
              Go Back to Sign In Page
            </Button>
          ]}
          style={styles.card}>
          <Meta
            title='Your account is not yet verified!'
            description='Please check your email if you have received the verification link we sent you.'
          />
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
    backgroundColor: '#f5f5f5'
  },
  row: {
    height: '100vh'
  }
}

export default UnverifiedScreen
