import React from 'react'
import { Button, Modal, Spin, Descriptions } from 'antd'
import * as PropTypes from 'prop-types'

const VideoModal = ({
  record,
  isModalVisible,
  localMediaAvailable,
  localMedia,
  remoteMedia,
  leaveRoom,
  remoteMediaAvailable
}) => {
  const showLocalTrack = localMediaAvailable ? (
    <div className='flex-item'>
      <div ref={localMedia} />
    </div>
  ) : (
    <Spin size='large' tip='...Connecting Local Video...' />
  )
  const showRemoteTrack = remoteMediaAvailable ? (
    <div className='flex-item'>
      <div ref={remoteMedia} />
    </div>
  ) : (
    <Spin size='large' tip='...Connecting Remote Video...' />
  )
  return (
    <span>
      <Modal
        visible={isModalVisible}
        onOk={e => {
          leaveRoom()
        }}
        onCancel={e => {
          leaveRoom()
        }}
        footer={[
          <Button
            key='back'
            onClick={e => {
              leaveRoom()
            }}>
            Cancel
          </Button>,
          <Button
            key='submit'
            type='primary'
            onClick={e => {
              // todo: dispatch action to confirm verification
              leaveRoom()
            }}>
            Confirm Verification
          </Button>
        ]}>
        {showLocalTrack}
        {showRemoteTrack}
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

VideoModal.propTypes = {
  record: PropTypes.object.isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  localMediaAvailable: PropTypes.bool.isRequired,
  localMedia: PropTypes.object,
  leaveRoom: PropTypes.func.isRequired,
  remoteMedia: PropTypes.object,
  remoteMediaAvailable: PropTypes.bool.isRequired
}

export default VideoModal
