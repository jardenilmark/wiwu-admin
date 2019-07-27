import { CHANGE_ACTIVE_TAB } from './user.constants'

export const changeActiveTab = key => {
  return dispatch => {
    dispatch({
      type: CHANGE_ACTIVE_TAB,
      payload: key
    })
  }
}
