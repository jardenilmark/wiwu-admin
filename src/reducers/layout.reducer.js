import { TOGGLE_SIDER_COLLAPSE } from '../actions/layout/layout.constants'

const initialState = {
  collapsed: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDER_COLLAPSE:
      return {
        ...state,
        collapsed: !state.collapsed
      }
    default:
      return {
        ...state
      }
  }
}
