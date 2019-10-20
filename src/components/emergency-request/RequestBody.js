import React from 'react'
import PropTypes from 'prop-types'
import { Input, Tooltip } from 'antd'
import Spacer from '../Spacer'
import moment from 'moment'

const RequestBody = props => {
  const { request } = props
  return (
    <>
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
            <td style={{ paddingRight: 8, fontWeight: 'bold' }}>Requester:</td>
            <td>{request.name}</td>
          </tr>
          <tr>
            <td style={{ paddingRight: 8, fontWeight: 'bold' }}>Phone:</td>
            <td>{request.phoneNumber}</td>
          </tr>
          <tr>
            <td style={{ paddingRight: 8, fontWeight: 'bold' }}>Address:</td>
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
            <td style={{ paddingRight: 8, fontWeight: 'bold' }}>Responder:</td>
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
    </>
  )
}

RequestBody.propTypes = {
  request: PropTypes.object.isRequired
}

export default RequestBody
