import React, { useState, createRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { message } from 'antd'
import Video from 'twilio-video'
import PropTypes from 'prop-types'
import VideoModal from './VideoModal'
import { resetToken } from '../../actions/twilio/resetToken.action'
import { isBeingVerified } from '../../actions/user/isBeingVerified.action'

const TwilioVideo = props => {
  const roomName = props.record.id
  const token = useSelector(state => state.twilio.token)
  const [isModalVisible, toggleModal] = useState(false)
  const [localMediaAvailable, setLocalMediaAvailable] = useState(false)
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false)
  const [hasLeftRoom, setHasLeftRoom] = useState(false)
  const [activeRoom, setActiveRoom] = useState(null)
  const [remoteMediaAvailable, setRemoteMediaAvailable] = useState(false)
  const [localMedia] = useState(createRef())
  const [remoteMedia] = useState(createRef())
  const dispatch = useDispatch()

  useEffect(() => {
    if (hasLeftRoom) {
      setHasLeftRoom(false)
      dispatch(resetToken())
      toggleModal(false)
    } else if (token && !hasJoinedRoom) {
      joinRoom()
      setHasJoinedRoom(true)
    }
  }, [hasLeftRoom, token, hasJoinedRoom, dispatch])

  const roomJoined = room => {
    try {
      setActiveRoom(room)
      setLocalMediaAvailable(true)
      setHasJoinedRoom(true)
      message.info('Connected to video chat room.', 5)
      if (localMedia) {
        attachParticipantTracks(room.localParticipant, localMedia.current)
      }
      room.participants.forEach(participant => {
        message.info(`Already in room ${participant.identity}.`, 5)
        if (remoteMedia) {
          setRemoteMediaAvailable(true)
          participantConnected(participant, remoteMedia.current)
        }
      })
      room.on('participantConnected', participant => {
        message.info(`Joining ${participant.identity}.`, 5)
        setRemoteMediaAvailable(true)
        participantConnected(participant, remoteMedia.current)
      })
      room.on('participantDisconnected', participant => {
        message.info(`Participant ${participant.identity} left the room.`, 5)
        detachParticipantTracks(participant)
      })
      room.on('disconnected', () => {
        message.info('Disconnected.', 5)
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
      const room = await Video.connect(token, connectOptions)
      roomJoined(room)
    } catch (error) {
      if (error.message.toUpperCase() === 'USER DEVICE COULD NOT FOUND') {
        message.error('Webcam and microphone not found.', 10)
      } else {
        message.error(error.message, 10)
      }
    }
  }

  const attachTrack = (track, container) => {
    container.appendChild(track.attach())
  }

  const attachTracks = (tracks, container) => {
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
    dispatch(isBeingVerified(props.record.id, false))
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
    participant.tracks.forEach(publication => {
      trackPublished(publication, container)
    })
    participant.on('trackPublished', publication =>
      trackPublished(publication, container)
    )
  }

  window.addEventListener('beforeunload', leaveRoom)

  return (
    <VideoModal
      record={props.record}
      isModalVisible={isModalVisible}
      localMediaAvailable={localMediaAvailable}
      localMedia={localMedia}
      remoteMedia={remoteMedia}
      leaveRoom={leaveRoom}
      remoteMediaAvailable={remoteMediaAvailable}
    />
  )
}

TwilioVideo.propTypes = {
  record: PropTypes.object.isRequired
}

export default TwilioVideo
