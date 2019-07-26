const changeActiveTab = key => {
  return dispatch => {
    dispatch({
      type: 'CHANGE_ACTIVE_TAB',
      payload: key
    })
  }
}

export { changeActiveTab }
