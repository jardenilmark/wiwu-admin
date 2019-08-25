import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchResponders } from '../../actions/user/fetchResponders.action'
import { toggleEditModal } from '../../actions/user/toggleEditModal.action'
import { setClickedResponder } from '../../actions/user/setClickedResponder.action'
import { deleteResponder } from '../../actions/responder/deleteResponder.action'
import { statuses } from '../../constants/User'
import { Table, Tag, Button } from 'antd'

import EditResponderModal from './EditResponderModal'

const { Column } = Table

const UsersList = () => {
  const dispatch = useDispatch()
  const responders = useSelector(state => state.user.responders)

  useEffect(() => {
    dispatch(fetchResponders())
  }, [])

  return (
    <div style={styles.tableWrapper}>
      <EditResponderModal />
      <Table dataSource={responders} bordered={true} style={{ width: '90%' }}>
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
                Edit
              </Button>
              <Button
                onClick={() => {
                  dispatch(deleteResponder(responder.id))
                }}>
                Delete
              </Button>
            </Button.Group>
          )}
        />
      </Table>
    </div>
  )
}

const styles = {
  tableWrapper: {
    display: 'flex',
    justifyContent: 'center'
  }
}

export default UsersList
