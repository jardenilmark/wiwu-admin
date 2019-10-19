import moment from 'moment'

export const getCsvData = (requests, department, spam, pending, completed) => {
  let lapazCount = 0
  let moloCount = 0
  let jaroCount = 0
  let paviaCount = 0
  let otonCount = 0
  let sanMiguelCount = 0
  let santaBarbaraCount = 0
  let leganesCount = 0
  let zarragaCount = 0

  let dayAccidentCount = 0
  let weekAccidentCount = 0
  let monthAccidentCount = 0
  let yearAccidentCount = 0

  requests.forEach(e => {
    const requestDate = e.date.toDate()
    const startOfDay = moment()
      .startOf('day')
      .toDate()
    const endOfDay = moment()
      .endOf('day')
      .toDate()
    const startOfWeek = moment()
      .startOf('week')
      .toDate()
    const endOfWeek = moment()
      .endOf('week')
      .toDate()
    const startOfMonth = moment()
      .startOf('month')
      .toDate()
    const endOfMonth = moment()
      .endOf('month')
      .toDate()
    const startOfYear = moment()
      .startOf('year')
      .toDate()
    const endOfYear = moment()
      .endOf('year')
      .toDate()

    const isWithinDay = moment().isBetween(startOfDay, endOfDay, requestDate)
    const isWithinWeek = moment().isBetween(startOfWeek, endOfWeek, requestDate)
    const isWithinMonth = moment().isBetween(
      startOfMonth,
      endOfMonth,
      requestDate
    )
    const isWithinYear = moment().isBetween(startOfYear, endOfYear, requestDate)

    if (isWithinDay) dayAccidentCount++
    if (isWithinWeek) weekAccidentCount++
    if (isWithinMonth) monthAccidentCount++
    if (isWithinYear) yearAccidentCount++

    const address = e.address.toLowerCase()
    const hasAddress = name => address.includes(name)

    if (hasAddress('jaro')) jaroCount++
    else if (hasAddress('la paz')) lapazCount++
    else if (hasAddress('molo')) moloCount++
    else if (hasAddress('pavia')) paviaCount++
    else if (hasAddress('oton')) otonCount++
    else if (hasAddress('san miguel')) sanMiguelCount++
    else if (hasAddress('santa barbara')) santaBarbaraCount++
    else if (hasAddress('leganes')) leganesCount++
    else if (hasAddress('zarraga')) zarragaCount++
  })

  return [
    ['DEPARTMENT', department],
    [],
    ['AREA', 'ACCIDENT_COUNT'],
    ['lapaz_incidents', lapazCount],
    ['molo_incidents', moloCount],
    ['jaro_incidents', jaroCount],
    ['pavia_incidents', paviaCount],
    ['oton_incidents', otonCount],
    ['san_miguel_incidents', sanMiguelCount],
    ['santa_barbara_incidents', santaBarbaraCount],
    ['leganes_incidents', leganesCount],
    ['lapaz_incidents', zarragaCount],
    [],
    ['STATUS', 'REQUEST_COUNT'],
    ['spam', spam],
    ['pending', pending],
    ['completed', completed],
    [],
    ['TIME_PERIOD', 'TIME_PERIOD_COUNT'],
    ['day', dayAccidentCount],
    ['week', weekAccidentCount],
    ['month', monthAccidentCount],
    ['year', yearAccidentCount]
  ]
}
