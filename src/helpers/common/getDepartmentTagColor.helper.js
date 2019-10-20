import _ from 'lodash'

export const getDepartmentTagColor = department => {
  if (_.lowerCase(department) === 'police') {
    return 'red'
  } else if (_.lowerCase(department) === 'fire') {
    return 'orange'
  } else {
    return 'blue'
  }
}
