import React from 'react'
import Spacer from '../Spacer'
import {
  Button,
  Card,
  Col,
  Icon,
  Input,
  Popconfirm,
  Spin,
  Tag,
  Tooltip
} from 'antd'
import { updateRequest } from '../../actions/emergency-request/updateEmergency.action'
import { firestore } from '../../firebase'
import { useDispatch } from 'react-redux'
import ProgressiveImage from 'react-progressive-image'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import moment from 'moment'
import _ from 'lodash'

const StyledImage = styled.img`
  &:hover {
    cursor: pointer;
  }
`

const RequestsColumn = props => {
  const dispatch = useDispatch()
  const { title, requests, user, setMediaModalOpen, setMediaUrl } = props

  return (
    <Col span={8} style={{ height: '75vh' }}>
      <b>{title}</b>
      <Spacer height={16} />
      <div style={{ height: '100%', overflow: 'auto' }}>
        {requests.map(request => {
          let tagColor = ''
          if (request.department === 'police') {
            tagColor = 'red'
          } else if (request.department === 'fire') {
            tagColor = 'orange'
          } else {
            tagColor = 'blue'
          }

          return (
            <Card
              key={request.id}
              style={{ marginBottom: '8px' }}
              size={'small'}
              title={
                <div>
                  <Tag color={tagColor}>{_.upperCase(request.department)}</Tag>
                  {request.responderId && <Tag color={'orange'}>ASSIGNED</Tag>}
                </div>
              }
              cover={
                request.media && (
                  <ProgressiveImage src={request.media} placeholder='media'>
                    {(src, loading) =>
                      loading ? (
                        <Spin style={{ marginTop: 24 }} spinning={true} />
                      ) : (
                        <Tooltip title={'Enlarge media'}>
                          <StyledImage
                            onClick={() => {
                              setMediaModalOpen(true)
                              setMediaUrl(src)
                            }}
                            height={100}
                            src={src}
                            alt={'media'}
                            style={{ objectFit: 'cover' }}
                          />
                        </Tooltip>
                      )
                    }
                  </ProgressiveImage>
                )
              }
              extra={
                _.upperCase(title) === 'PENDING' && (
                  // MARK COMPLETED
                  <Popconfirm
                    disabled={!request.responderId}
                    title='Are you sure to mark this completed?'
                    okText='Yes'
                    cancelText='No'
                    onConfirm={() =>
                      dispatch(
                        updateRequest(request.id, {
                          status: 'COMPLETED'
                        })
                      )
                    }>
                    <Tooltip
                      key={'move-to-completed'}
                      title={
                        request.responderId
                          ? 'Move card to completed'
                          : 'Assign responder to move request to completed'
                      }>
                      <Button
                        icon={'arrow-right'}
                        disabled={!request.responderId}
                      />
                    </Tooltip>
                  </Popconfirm>
                )
              }
              actions={[
                // ASSIGN TO ME
                <Tooltip
                  key={'assign-to-me'}
                  title={() => {
                    if (request.responderId) {
                      return 'Request already assigned'
                    } else if (request.isMarkedSpam) {
                      return 'Cannot assign, already marked as spam!'
                    } else {
                      return 'Assign to me'
                    }
                  }}>
                  <Popconfirm
                    disabled={request.responderId || request.isMarkedSpam}
                    title='Assign this request to yourself?'
                    okText='Yes'
                    cancelText='No'
                    onConfirm={() =>
                      dispatch(
                        updateRequest(request.id, {
                          responderId: firestore.doc(`users/${user.uid}`)
                        })
                      )
                    }>
                    <Button
                      disabled={request.responderId || request.isMarkedSpam}
                      size={'small'}
                      type={'link'}
                      style={{
                        color:
                          request.responderId || request.isMarkedSpam
                            ? 'grey'
                            : 'green'
                      }}>
                      <Icon type='user-add' />
                    </Button>
                  </Popconfirm>
                </Tooltip>,

                // BROADCAST EMERGENCY
                <Tooltip key={'broadcast'} title='Broadcast emergency'>
                  <Button
                    size={'small'}
                    type={'link'}
                    disabled={
                      request.status === 'COMPLETED' || request.isMarkedSpam
                    }>
                    <Icon type='global' />
                  </Button>
                </Tooltip>,

                // SHOW EMERGENCY LOCATION
                <Tooltip key={'show-location'} title='Show in map'>
                  <Button size={'small'} type={'link'}>
                    <Icon type='environment' />
                  </Button>
                </Tooltip>,

                // MARK AS SPAM
                <Tooltip
                  key={'mark-spam'}
                  title={
                    request.isMarkedSpam ? 'Remove from spam' : 'Mark as spam'
                  }>
                  <Popconfirm
                    disabled={
                      _.upperCase(title) === 'COMPLETED' &&
                      request.status === 'COMPLETED'
                    }
                    title={`Are you sure to ${
                      request.isMarkedSpam
                        ? 'remove this from spam'
                        : 'mark this as spam'
                    }?`}
                    okText={'Yes'}
                    cancelText='No'
                    onConfirm={() =>
                      dispatch(
                        updateRequest(request.id, {
                          isMarkedSpam: !request.isMarkedSpam
                        })
                      )
                    }>
                    <Button
                      size={'small'}
                      type={'link'}
                      disabled={
                        _.upperCase(title) === 'COMPLETED' &&
                        request.status === 'COMPLETED'
                      }
                      style={{
                        color:
                          _.upperCase(title) === 'COMPLETED' &&
                          request.status === 'COMPLETED'
                            ? 'grey'
                            : 'red'
                      }}>
                      <Icon
                        type={request.isMarkedSpam ? 'minus-circle' : 'warning'}
                      />
                    </Button>
                  </Popconfirm>
                </Tooltip>
              ]}>
              {/* role */}
              <b>{request.role}</b>

              {/* date of request */}
              <div style={{ color: 'grey' }}>
                {moment(request.date.toDate()).format('MMM DD, YYYY - hh:mmA')}
              </div>
              <Spacer height={8} />

              {/* more info */}
              <table>
                <tbody>
                  <tr>
                    <td style={{ paddingRight: 8 }}>Requester</td>
                    <td>{request.name}</td>
                  </tr>
                  <tr>
                    <td style={{ paddingRight: 8 }}>Phone</td>
                    <td>{request.phoneNumber}</td>
                  </tr>
                  <tr>
                    <td style={{ paddingRight: 8 }}>Address</td>
                    <td>
                      {request.address || (
                        <Tooltip
                          placement='right'
                          title='You may need to confirm request address by calling back the requester'>
                          N / A
                        </Tooltip>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingRight: 8 }}>Responder</td>
                    <td>
                      {request.responderId
                        ? `${request.responderId.firstName} ${request.responderId.lastName}`
                        : 'Unassigned'}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* conditional description */}
              {request.description && (
                <>
                  <Spacer height={8} />
                  <Input.TextArea
                    style={{ color: '#606060' }}
                    value={request.description}
                    autosize={true}
                    disabled={true}
                  />
                </>
              )}
            </Card>
          )
        })}
      </div>
    </Col>
  )
}

RequestsColumn.propTypes = {
  title: PropTypes.string.isRequired,
  requests: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  setMediaModalOpen: PropTypes.func.isRequired,
  setMediaUrl: PropTypes.func.isRequired
}

export default RequestsColumn
