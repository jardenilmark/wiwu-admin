import { createAction } from 'redux-actions'

import { FILTER_RESPONDERS } from './responder.constants'

export const filterResponders = (responders, filter) => {
  return dispatch => {
    let result = responders
    if (filter !== 'all') {
      result = responders.filter(responder => responder.status === filter)
    }
    dispatch(createAction(FILTER_RESPONDERS)(result))
  }
}
