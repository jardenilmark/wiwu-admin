import { message } from 'antd'
import { createAction } from 'redux-actions'

import { firestore as db } from '../../firebase'

import { FETCH_CONTACTS } from './contact.constants'

export const fetchContacts = () => {
  return async dispatch => {
    try {
      const contactsRef = await db.collection('contacts').get()

      const contacts = contactsRef.docs.map(contact => {
        return { ...contact.data(), id: contact.id }
      })

      dispatch(createAction(FETCH_CONTACTS)(contacts))
    } catch (error) {
      message.error(error.message, 10)
    }
  }
}
