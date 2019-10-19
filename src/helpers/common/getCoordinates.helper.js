import Geocode from 'react-geocode'

export const getCoordinatesHelper = async address => {
  let location

  try {
    Geocode.setApiKey('AIzaSyBvUkXmNQ5VDKN46EYEPy8QuHluzzpxvog')
    const response = await Geocode.fromAddress(address)
    location = response.results[0].geometry.location
  } catch (error) {
    console.log('geocode error: ', error.message)
  }

  return {
    latitude: location.lat,
    longitude: location.lng
  }
}
