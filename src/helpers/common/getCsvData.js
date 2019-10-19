import moment from 'moment'

export const getCsvData = (requests, department, spam, pending, completed) => {
  const municipalities = {
    lapaz: 0,
    molo: 0,
    jaro: 0,
    pavia: 0,
    oton: 0,
    sanMiguel: 0,
    santaBarbara: 0,
    leganes: 0,
    zarraga: 0
  }

  const accidentDate = {
    day: 0,
    week: 0,
    month: 0,
    year: 0
  }

  requests.forEach(e => {
    const requestDate = e.date.toDate()

    const isWithinPeriod = period =>
      moment(requestDate).isBetween(
        moment()
          .startOf(period)
          .toDate(),
        moment()
          .endOf(period)
          .toDate(),
        requestDate
      )

    for (const date in accidentDate) {
      if (isWithinPeriod(date)) accidentDate[date]++
    }

    const address = e.address.toLowerCase()
    const hasAddress = name => address.includes(name)

    for (const municipality in municipalities) {
      if (hasAddress(municipality)) return municipalities[municipality]++
    }
  })

  const municipalityData = Object.keys(municipalities).map(municipality => [
    `${municipality}_incidents`,
    municipalities[municipality]
  ])

  const accidentDateData = Object.keys(accidentDate).map(date => [
    date,
    accidentDate[date]
  ])

  return [
    ['DEPARTMENT', department],
    [],
    ...municipalityData,
    [],
    ['STATUS', 'REQUEST_COUNT'],
    ['spam', spam],
    ['pending', pending],
    ['completed', completed],
    [],
    ['TIME_PERIOD', 'TIME_PERIOD_COUNT'],
    ...accidentDateData
  ]
}
