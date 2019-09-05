import React, { useState, createRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Table, Button, message, Divider } from 'antd'
import Video from 'twilio-video'
import VideoModal from './VideoModal'
import { getTwilioToken } from '../actions/twilio/getTwilioToken.action'
import { resetTwilioToken } from '../actions/twilio/resetTwilioToken.action'

const VideoVerification = () => {
  const [isModalVisible, toggleModal] = useState(false)
  // todo change to admin.current.displayName or something
  const identity = 'Admin'
  const token = useSelector(state => state.twilio.token)
  const [roomName, setRoomName] = useState('')
  const [previewTracks, setPreviewTracks] = useState(null)
  const [localMediaAvailable, setLocalMediaAvailable] = useState(false)
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false)
  const [hasLeftRoom, setHasLeftRoom] = useState(false)
  const [activeRoom, setActiveRoom] = useState(null)
  const [remoteMediaAvailable, setRemoteMediaAvailable] = useState(false)
  const [record, setRecord] = useState({})
  const [localMedia] = useState(createRef())
  const [remoteMedia] = useState(createRef())
  const dispatch = useDispatch()

  useEffect(() => {
    if (hasLeftRoom) {
      setHasLeftRoom(false)
      dispatch(resetTwilioToken())
      toggleModal(false)
    } else if (token && !hasJoinedRoom) {
      joinRoom()
      setHasJoinedRoom(true)
    }
  })

  const roomJoined = room => {
    try {
      setActiveRoom(room)
      setLocalMediaAvailable(true)
      setHasJoinedRoom(true)
      if (localMedia) {
        attachParticipantTracks(room.localParticipant, localMedia.current)
      }
      room.participants.forEach(participant => {
        // todo: replace this
        console.log(`Already in room ${participant.identity}`)
        if (remoteMedia) {
          setRemoteMediaAvailable(true)
          participantConnected(participant, remoteMedia.current)
        }
      })
      room.on('participantConnected', participant => {
        // todo: replace this
        console.log('participant', participant)
        console.log(`Joining ${participant.identity}`)
        setRemoteMediaAvailable(true)
        participantConnected(participant, remoteMedia.current)
      })
      room.on('participantDisconnected', participant => {
        // todo: replace this
        console.log(`Participant ${participant.identity} left the room`)
        detachParticipantTracks(participant)
      })
      room.on('disconnected', () => {
        if (previewTracks) {
          previewTracks.forEach(track => {
            track.stop()
          })
          setPreviewTracks(null)
        }
        detachParticipantTracks(room.localParticipant)
        room.participants.forEach(detachParticipantTracks)
        setActiveRoom(null)
        setHasJoinedRoom(false)
        setHasLeftRoom(true)
        setLocalMediaAvailable(false)
      })
    } catch (error) {
      message.error(error.message, 10)
    }
  }

  const joinRoom = async () => {
    try {
      toggleModal(true)
      const connectOptions = {
        name: roomName,
        audio: true,
        video: { width: 144 }
      }
      if (previewTracks) {
        connectOptions.tracks = previewTracks
      }
      const room = await Video.connect(token, connectOptions)
      roomJoined(room)
    } catch (error) {
      message.error(error.message, 10)
    }
  }

  const attachTrack = (track, container) => {
    console.log('track', track)
    console.log('container', container)
    container.appendChild(track.attach())
  }

  const attachTracks = (tracks, container) => {
    console.log(tracks)
    tracks.forEach(track => {
      if (track.track) {
        attachTrack(track.track, container)
      } else {
        attachTrack(track, container)
      }
    })
  }

  const attachParticipantTracks = (participant, container) => {
    const tracks = Array.from(participant.tracks.values())
    attachTracks(tracks, container)
  }

  const leaveRoom = () => {
    if (activeRoom) {
      activeRoom.disconnect()
    }
  }

  const getTracks = participant => {
    return Array.from(participant.tracks.values())
      .filter(publication => publication.track)
      .map(publication => publication.track)
  }

  const detachTrack = track => {
    track.detach().forEach(detachedElement => detachedElement.remove())
  }

  const detachParticipantTracks = participant => {
    const tracks = getTracks(participant)
    tracks.forEach(detachTrack)
  }

  const trackPublished = (publication, container) => {
    if (publication.isSubscribed) {
      attachTrack(publication.track, container)
    }
    publication.on('subscribed', track => {
      attachTrack(track, container)
    })
    publication.on('unsubscribed', detachTrack)
  }

  const participantConnected = (participant, container) => {
    console.log(participant.tracks)
    participant.tracks.forEach(publication => {
      trackPublished(publication, container)
    })
    participant.on('trackPublished', publication =>
      trackPublished(publication, container)
    )
  }

  window.addEventListener('beforeunload', leaveRoom)

  const renderActions = (text, record) => (
    <span>
      <Button
        icon='video-camera'
        size='small'
        onClick={() => {
          setRoomName(record.email)
          setRecord(record)
          dispatch(getTwilioToken(identity, record.email))
        }}>
        Join Room
      </Button>
      <Divider type='vertical' />
      <Button size='small' icon='video-camera' onClick={() => {}}>
        Verify ID
      </Button>
    </span>
  )

  const sampleData = [
    {
      firstName: 'Luca',
      lastName: 'Brasi',
      phoneNumber: '09773513562',
      email: 'jevi.lanchinebre@gmail.com'
    },
    {
      firstName: 'Vito',
      lastName: 'Corleone',
      phoneNumber: '09773513562',
      email: 'jvcl1225@gmail.com'
    }
  ]
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName'
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName'
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => renderActions(text, record)
    }
  ]
  return (
    <div>
      <Row style={{ margin: '8px' }}>
        <Col span={24}>
          <Table
            dataSource={sampleData}
            columns={columns}
            rowKey='email'
            title={() => 'Pending Verifications'}
          />
        </Col>
      </Row>
      <VideoModal
        record={record}
        isModalVisible={isModalVisible}
        localMediaAvailable={localMediaAvailable}
        localMedia={localMedia}
        remoteMedia={remoteMedia}
        leaveRoom={leaveRoom}
        remoteMediaAvailable={remoteMediaAvailable}
      />
    </div>
  )
}

export default VideoVerification
