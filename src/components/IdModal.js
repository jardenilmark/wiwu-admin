import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, Modal, Descriptions, Empty } from 'antd'
import * as PropTypes from 'prop-types'
import { verifyUser } from '../actions/user/verifyUser.action'

const IdModal = ({ record, isIdModalVisible, toggleIdModal }) => {
  const dispatch = useDispatch()
  return (
    <span>
      <Modal
        visible={isIdModalVisible}
        onOk={e => {
          toggleIdModal(false)
        }}
        onCancel={e => {
          toggleIdModal(false)
        }}
        footer={[
          <Button
            key='submit'
            type='primary'
            onClick={async e => {
              await dispatch(verifyUser(record.id))
              toggleIdModal(false)
            }}
            disabled={!record.idImage}>
            Confirm Verification
          </Button>,
          <Button
            key='back'
            onClick={e => {
              toggleIdModal(false)
            }}>
            Cancel
          </Button>
        ]}>
        {record.idImage ? <img src={record.idImage} alt='ID' /> : <Empty />}
        <Descriptions title='User Info' bordered size='small' layout='vertical'>
          <Descriptions.Item label='First Name'>
            {record.firstName}
          </Descriptions.Item>
          <Descriptions.Item label='Last Name'>
            {record.lastName}
          </Descriptions.Item>
          <Descriptions.Item label='Phone Number'>
            {record.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label='Email'>{record.email}</Descriptions.Item>
        </Descriptions>
      </Modal>
    </span>
  )
}

IdModal.propTypes = {
  record: PropTypes.object.isRequired,
  isIdModalVisible: PropTypes.bool.isRequired,
  toggleIdModal: PropTypes.func.isRequired
}

export default IdModal
