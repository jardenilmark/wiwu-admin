import React, { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchContacts } from '../../actions/contact/fetchContacts.action'
import { deleteContact } from '../../actions/contact/deleteContact.action'
import { setClickedContact } from '../../actions/contact/setClickedContact.action'
import { toggleEditModal } from '../../actions/contact/toggleEditModal.action'
import { List, Avatar, Icon, Popconfirm, Tooltip } from 'antd'

import Spinner from '../Spinner'
import EditContactModal from './EditContactModal'

const ContactsList = () => {
  const dispatch = useDispatch()
  const contacts = useSelector(state => state.contact.contacts)
  const [fetching, setFetchingStatus] = useState(true)

  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchContacts())
      setFetchingStatus(false)
    }

    fetchData()
  }, [])

  if (fetching) {
    return <Spinner tip='Fetching Contacts...' />
  }

  return (
    <div style={styles.listWrapper}>
      <EditContactModal />
      <List
        style={styles.list}
        itemLayout='horizontal'
        pagination={{ pageSize: 7, hideOnSinglePage: true, size: 'small' }}
        dataSource={contacts}
        renderItem={contact => {
          return (
            <List.Item
              actions={[
                <Tooltip placement='top' title='Edit Contact'>
                  <Icon
                    type='edit'
                    style={{ fontSize: 18 }}
                    onClick={() => {
                      dispatch(setClickedContact(contact))
                      dispatch(toggleEditModal())
                    }}
                  />
                </Tooltip>,
                <Popconfirm
                  placement='top'
                  title='Are you sure you want to delete this contact?'
                  onConfirm={() => dispatch(deleteContact(contact.id))}
                  okText='Yes'
                  cancelText='No'>
                  <Icon type='delete' style={{ fontSize: 18 }} />
                </Popconfirm>
              ]}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={require(`../../assets/images/${contact.department}.png`)}
                    size={45}
                  />
                }
                title={<b>{contact.name}</b>}
                description={
                  <Fragment>
                    <span>{contact.address}</span>
                    <br />
                    <span>{contact.numbers.join(', ')}</span>
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

export default ContactsList
