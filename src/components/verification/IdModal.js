import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Modal, Descriptions, Empty, Divider } from 'antd'
import * as PropTypes from 'prop-types'
import ProgressiveImage from 'react-progressive-image'

import { changeUserStatus } from '../../actions/user/changeUserStatus.action'

import { statuses } from '../../constants/User'

import Spinner from '../Spinner'
import { isBeingVerified } from '../../actions/user/isBeingVerified.action'
import { verifyUserId } from '../../actions/user/verifyUserId.action'

const IdModal = ({ record, isIdModalVisible, toggleIdModal }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dispatch = useDispatch()
  const close = () => {
    toggleIdModal(false)
    dispatch(isBeingVerified(record.id, false))
  }
  return (
    <span>
      <Modal
        visible={isIdModalVisible}
        onOk={e => {
          close()
        }}
        onCancel={e => {
          close()
        }}
        footer={[
          <Button
            key='confirm'
            type='primary'
            icon='check-circle'
            onClick={async e => {
              setIsSubmitting(true)
              await dispatch(verifyUserId(record.id))
              close()
            }}
            disabled={!record.idImage || isSubmitting}>
            Verify ID
          </Button>,
          <Button
            key='block'
            type='danger'
            icon='close-circle'
            onClick={async e => {
              setIsSubmitting(true)
              await dispatch(changeUserStatus(record.id, statuses.BLOCKED))
              close()
            }}
            disabled={isSubmitting}>
            Block User
          </Button>
        ]}>
        {record.idImage ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ProgressiveImage src={record.idImage} placeholder='avatar'>
              {(src, loading) =>
                loading ? (
                  <Spinner height={300} tip={'Loading ID image...'} />
                ) : (
                  <img src={src} alt='id' width={300} height={300} />
                )
              }
            </ProgressiveImage>
          </div>
        ) : (
          <Empty />
        )}
        <Divider />
        <Descriptions bordered size='small' layout='vertical'>
          <Descriptions.Item label='First Name'>
            {record.firstName}
          </Descriptions.Item>
          <Descriptions.Item label='Last Name'>
            {record.lastName}
          </Descriptions.Item>
          <Descriptions.Item label='Phone Number'>
            {record.phoneNumber}
          </Descriptions.Item>
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
