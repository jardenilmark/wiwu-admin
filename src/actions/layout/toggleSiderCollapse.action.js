import { TOGGLE_SIDER_COLLAPSE } from './layout.constants'
import { createAction } from 'redux-actions'

export const toggleSiderCollapse = () => {
  return dispatch => {
    dispatch(createAction(TOGGLE_SIDER_COLLAPSE)())
  }
}
