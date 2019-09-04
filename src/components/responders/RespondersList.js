import React, { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchResponders } from '../../actions/responder/fetchResponders.action'
import { toggleEditModal } from '../../actions/responder/toggleEditModal.action'
import { setClickedResponder } from '../../actions/responder/setClickedResponder.action'
import { deleteResponder } from '../../actions/responder/deleteResponder.action'
import { statuses } from '../../constants/User'
import { List, Avatar, Icon, Tooltip, Tag, Popconfirm } from 'antd'

import EditResponderModal from './EditResponderModal'
import Spinner from '../Spinner'

const RespondersList = () => {
  const dispatch = useDispatch()
  const responders = useSelector(state => state.admin.responders)
  const filteredResponders = useSelector(
    state => state.admin.filteredResponders
  )
  const [fetching, setFetchingStatus] = useState(true)

  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchResponders())
      setFetchingStatus(false)
    }

    fetchData()
  }, [])

  if (fetching) {
    return <Spinner tip='Fetching Responders...' height={700} />
  }

  return (
    <div style={styles.listWrapper}>
      <EditResponderModal />
      <List
        style={styles.list}
        itemLayout='horizontal'
        pagination={{ pageSize: 7, hideOnSinglePage: true, size: 'small' }}
        dataSource={filteredResponders ? filteredResponders : responders}
        renderItem={responder => {
          const color = responder.status === statuses.ACTIVE ? 'green' : 'red'
          return (
            <List.Item
              actions={[
                <Tooltip placement='left' title='Edit Responder'>
                  <Icon
                    type='edit'
                    style={{ fontSize: 18 }}
                    onClick={() => {
                      dispatch(setClickedResponder(responder))
                      dispatch(toggleEditModal())
                    }}
                  />
                </Tooltip>,
                <Tooltip placement='left' title='Archive Responder'>
                  <Popconfirm
                    placement='top'
                    title='Are you sure you want to archive this responder?'
                    onConfirm={() => dispatch(deleteResponder(responder.id))}
                    okText='Yes'
                    cancelText='No'>
                    <Icon type='history' style={{ fontSize: 18 }} />
                  </Popconfirm>
                </Tooltip>
              ]}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={require('../../assets/images/user-avatar.png')}
                  />
                }
                title={
                  <b>
                    {responder.firstName} {responder.lastName} |{' '}
                    <Tag color={color}>{responder.status.toUpperCase()}</Tag>
                  </b>
                }
                description={
                  <Fragment>
                    <span>{responder.department}</span>
                    <br />
                    <span>{responder.phoneNumber}</span>
                  </Fragment>
                }
              />
            </List.Item>
          )
        }}
      />
    </div>
  )
}

const styles = {
  listWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  list: {
    width: '70%',
    textAlign: 'left'
  }
}

export default RespondersList
