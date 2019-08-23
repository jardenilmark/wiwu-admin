import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchResponders } from '../../actions/user/fetchResponders.action'
import { toggleEditModal } from '../../actions/user/toggleEditModal.action'
import { setClickedResponder } from '../../actions/user/setClickedResponder.action'
import { statuses } from '../../constants/User'
import { Table, Tag, Button } from 'antd'

import EditResponderModal from './EditResponderModal'

const { Column, ColumnGroup } = Table

const ViewResponders = () => {
  const dispatch = useDispatch()
  const responders = useSelector(state => state.user.responders)

  useEffect(() => {
    dispatch(fetchResponders())
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'top',
        height: '100%',
        paddingTop: '50px'
      }}>
      <EditResponderModal />
      <Table
        dataSource={responders}
        bordered={true}
        style={{ width: '1200px' }}>
        <ColumnGroup title='Name'>
          <Column
            title='First Name'
            dataIndex='responder.firstName'
            key='firstName'
            align='center'
          />
          <Column
            title='Last Name'
            dataIndex='responder.lastName'
            key='lastName'
            align='center'
          />
        </ColumnGroup>
        <Column
          title='Phone Number'
          dataIndex='responder.phoneNumber'
          key='phoneNumber'
          align='center'
        />
        <Column
          title='Department'
          dataIndex='responder.department'
          key='department'
          align='center'
        />
        <Column
          title='Status'
          dataIndex='responder.status'
          key='status'
          align='center'
          render={status => {
            const color = status === statuses.ACTIVE ? 'green' : 'red'
            return <Tag color={color}>{status}</Tag>
          }}
        />
        <Column
          title='Actions'
          key='actions'
          dataIndex='responder'
          align='center'
          render={responder => (
            <Button.Group>
              <Button
                onClick={() => {
                  dispatch(setClickedResponder({ ...responder }))
                  dispatch(toggleEditModal())
                }}>
                {/* <Icon type='edit' /> */}
                Edit
              </Button>
              <Button
                onClick={() => {
                  dispatch(setClickedResponder({ ...responder }))
                }}>
                {/* <Icon type='delete' /> */}
                Delete
              </Button>
            </Button.Group>
          )}
        />
      </Table>
    </div>
  )
}

export default ViewResponders
