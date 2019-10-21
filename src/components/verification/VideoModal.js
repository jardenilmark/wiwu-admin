import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, Modal, Spin, Descriptions } from 'antd'
import * as PropTypes from 'prop-types'
import { verifyUser } from '../../actions/user/verifyUser.action'
import { changeUserStatus } from '../../actions/user/changeUserStatus.action'
import { statuses } from '../../constants/User'
import './video.css'

const VideoModal = ({
  record,
  isModalVisible,
  localMediaAvailable,
  localMedia,
  remoteMedia,
  leaveRoom,
  remoteMediaAvailable
}) => {
  const dispatch = useDispatch()

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
            key='confirm'
            type='primary'
            icon='check-circle'
            onClick={async e => {
              await leaveRoom()
              await dispatch(verifyUser(record.id))
            }}
            disabled={record.joinedVideo}>
            Confirm Verification
          </Button>,
          <Button
            key='block'
            type='danger'
            icon='close-circle'
            onClick={async e => {
              leaveRoom()
              await dispatch(changeUserStatus(record.id, statuses.BLOCKED))
            }}
            disabled={record.joinedVideo}>
            Block User
          </Button>
        ]}>
        <div style={{ display: 'flex' }}>
          <div
            style={{
              flex: 1,
              padding: 0,
              margin: 8,
              textAlign: 'center'
            }}>
            {remoteMediaAvailable || localMediaAvailable ? (
              <div />
            ) : (
              <div style={{ display: 'inline-block', margin: 50 }}>
                <Spin size='large' tip='...Connecting Video Streams...' />
              </div>
            )}
            <div
              style={{
                width: '100%',
                display: 'inline-block'
              }}>
              <div id='remote-media' ref={remoteMedia} />
            </div>
            <div style={{ float: 'right', marginLeft: -200 }}>
              <div ref={localMedia} />
            </div>
          </div>
        </div>
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
