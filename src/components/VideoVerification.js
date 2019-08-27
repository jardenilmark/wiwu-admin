import React, { useState, createRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Row, Col, Table, Typography, Button, message } from 'antd'
import Video from 'twilio-video'
import VideoModal from './VideoModal'
import { getTwilioToken } from '../actions/twilio/getTwilioToken.action'
import { resetTwilioToken } from '../actions/twilio/resetTwilioToken.action'

const VideoVerification = () => {
  const [isModalVisible, toggleModal] = useState(false)
  // todo change to admin.current.displayName
  const identity = 'Jess'
  const token = useSelector(state => state.twilio.token)
  const [roomName, setRoomName] = useState('')
  const [previewTracks, setPreviewTracks] = useState(null)
  const [localMedia, setLocalMedia] = useState(createRef())
  const [localMediaAvailable, setLocalMediaAvailable] = useState(false)
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false)
  const [hasLeftRoom, setHasLeftRoom] = useState(false)
  const [activeRoom, setActiveRoom] = useState(null)
  const [remoteMedia, setRemoteMedia] = useState(createRef())
  const [remoteMediaAvailable, setRemoteMediaAvailable] = useState(false)
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
          attachParticipantTracks(participant, remoteMedia.current)
        }
      })
      room.on('participantConnected', participant => {
        // todo: replace this
        console.log(`Joining ${participant.identity}`)
      })
      room.on('trackAdded', (track, participant) => {
        // todo: replace this
        console.log(`${participant.identity} added track: ${track.kind}`)
        if (remoteMedia) {
          attachTracks([track], remoteMedia.current)
        }
      })
      room.on('trackRemoved', (track, participant) => {
        // todo: replace this
        console.log(`${participant.identity} removed track: ${track.kind}`)
        detachTracks([track])
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

  const attachTracks = (tracks, container) => {
    tracks.forEach(track => {
      // note: track.attach() not a function; tutorial = fake news
      container.appendChild(track.track.attach())
    })
  }

  const attachParticipantTracks = (participant, container) => {
    const tracks = Array.from(participant.tracks.values())
    attachTracks(tracks, container)
  }

  const leaveRoom = () => {
    activeRoom.disconnect()
  }

  const detachTracks = tracks => {
    tracks.forEach(track => {
      track.track.detach().forEach(detachedElement => {
        detachedElement.remove()
      })
    })
  }

  const detachParticipantTracks = participant => {
    const tracks = Array.from(participant.tracks.values())
    detachTracks(tracks)
  }

  const { Title } = Typography
  const sampleData = [
    {
      firstName: 'Luca',
      lastName: 'Brasi',
      phoneNumber: '09773513562',
      email: 'jvcl122@gmail.com'
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
      render: function renderActions(text, record) {
        return (
          <span>
            <Button
              type='primary'
              icon='video-camera'
              onClick={() => {
                setRoomName(record.email)
                dispatch(getTwilioToken(identity, record.email))
              }}>
              Join Video Chat
            </Button>
            <VideoModal
              record={record}
              isModalVisible={isModalVisible}
              localMediaAvailable={localMediaAvailable}
              localMedia={localMedia}
              remoteMedia={remoteMedia}
              leaveRoom={leaveRoom}
              remoteMediaAvailable={remoteMediaAvailable}
            />
          </span>
        )
      }
    }
  ]
  return (
    <Card>
      <Row style={{ margin: '8px' }}>
        <Col span={4}>
          <Title level={4}>Video Verification</Title>
        </Col>
        <Col span={20} />
      </Row>
      <Row style={{ margin: '8px' }}>
        <Col span={24}>
          <Table dataSource={sampleData} columns={columns} rowKey='email' />
        </Col>
      </Row>
    </Card>
  )
}

export default VideoVerification
