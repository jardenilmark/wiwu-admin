const initialState = {
  activeTabKey: 'signIn'
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_ACTIVE_TAB':
      return {
        ...state,
        activeTabKey: action.payload
      }
    default:
      return {
        ...state
      }
  }
}
