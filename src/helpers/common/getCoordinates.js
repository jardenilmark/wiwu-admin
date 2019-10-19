import Geocode from 'react-geocode'

export const getCoordinates = async address => {
  let location

  try {
    Geocode.setApiKey(process.env.REACT_APP_API_KEY)
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
