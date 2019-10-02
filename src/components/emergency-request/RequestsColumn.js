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
                title !== 'Spam' && [
                  <Tooltip key={'move-to-pending'} title='Move card to pending'>
                    <Button
                      style={{ marginRight: 4 }}
                      disabled={request.status === 'PENDING'}
                      icon={'arrow-left'}
                      onClick={() =>
                        dispatch(
                          updateRequest(request.id, {
                            status: 'PENDING'
                          })
                        )
                      }
                    />
                  </Tooltip>,
                  <Tooltip
                    key={'move-to-completed'}
                    title='Move card to completed'>
                    <Button
                      icon={'arrow-right'}
                      disabled={request.status === 'COMPLETED'}
                      onClick={() =>
                        dispatch(
                          updateRequest(request.id, {
                            status: 'COMPLETED'
                          })
                        )
                      }
                    />
                  </Tooltip>
                ]
              }
              actions={[
                <Tooltip
                  key={'assign-to-me'}
                  title={
                    request.responderId
                      ? 'Request already assigned'
                      : 'Assign to me'
                  }>
                  <Popconfirm
                    title='Are you sure assign this request to yourself?'
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
                      disabled={request.responderId}
                      size={'small'}
                      type={'link'}
                      style={{
                        color: request.responderId ? 'grey' : 'green'
                      }}>
                      <Icon type='user-add' />
                    </Button>
                  </Popconfirm>
                </Tooltip>,
                <Tooltip key={'broadcast'} title='Broadcast emergency'>
                  <Button size={'small'} type={'link'}>
                    <Icon type='global' />
                  </Button>
                </Tooltip>,
                <Tooltip key={'show-location'} title='Show in map'>
                  <Button size={'small'} type={'link'}>
                    <Icon type='environment' />
                  </Button>
                </Tooltip>,
                <Tooltip
                  key={'mark-spam'}
                  title={
                    request.isMarkedSpam
                      ? 'Already marked as spam'
                      : 'Mark as spam'
                  }>
                  <Button
                    size={'small'}
                    type={'link'}
                    disabled={request.isMarkedSpam}
                    style={{
                      color: request.isMarkedSpam ? 'grey' : 'red'
                    }}
                    onClick={() =>
                      dispatch(
                        updateRequest(request.id, {
                          isMarkedSpam: true
                        })
                      )
                    }>
                    <Icon type='stop' />
                  </Button>
                </Tooltip>
              ]}>
              <b>{request.role}</b>
              <div style={{ color: 'grey' }}>
                {moment(request.date.toDate()).format('MMM DD, YYYY - hh:mmA')}
              </div>
              <Spacer height={8} />
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
