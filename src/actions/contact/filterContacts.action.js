import { FILTER_CONTACTS } from './contact.constants'
import { createAction } from 'redux-actions'

export const filterContacts = (contacts, filter) => {
  return dispatch => {
    let result = contacts
    if (filter !== 'all') {
      result = contacts.filter(contact => contact.department === filter)
    }
    dispatch(createAction(FILTER_CONTACTS)(result))
  }
}
