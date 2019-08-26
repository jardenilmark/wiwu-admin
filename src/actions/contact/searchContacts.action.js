import { SEARCH_CONTACTS } from './contact.constants'
import FuzzySearch from 'fuzzy-search'
import { createAction } from 'redux-actions'

export const searchContacts = (contacts, input) => {
  return dispatch => {
    const searcher = new FuzzySearch(contacts, ['name'], {
      sort: true
    })

    const result = searcher.search(input)
    dispatch(createAction(SEARCH_CONTACTS)(result))
  }
}
