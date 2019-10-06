import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Modal, Descriptions, Empty, Divider } from 'antd'
import * as PropTypes from 'prop-types'
import ProgressiveImage from 'react-progressive-image'

import { verifyUser } from '../../actions/user/verifyUser.action'
import { changeUserStatus } from '../../actions/user/changeUserStatus.action'

import { statuses } from '../../constants/User'

import Spinner from '../Spinner'

const IdModal = ({ record, isIdModalVisible, toggleIdModal }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
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
            icon='check-circle'
            onClick={async e => {
              setIsSubmitting(true)
              await dispatch(verifyUser(record.id))
              toggleIdModal(false)
            }}
            disabled={!record.idImage || isSubmitting}>
            Verify User
          </Button>,
          <Button
            key='submit'
            type='danger'
            icon='close-circle'
            onClick={async e => {
              setIsSubmitting(true)
              await dispatch(changeUserStatus(record.id, statuses.BLOCKED))
              toggleIdModal(false)
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
                  <img src={src} width={300} height={300} />
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
