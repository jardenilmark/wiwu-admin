import React from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

const MapContainer = ({ google, location }) => {
  const lat = location.latitude
  const lng = location.longitude
  return (
    <div style={{ width: '600px', height: '500px' }}>
      <Map
        google={google}
        zoom={18}
        style={{ width: '600px', height: '500px' }}
        initialCenter={{ lat: lat, lng: lng }}>
        <Marker position={{ lat: lat, lng: lng }} />
      </Map>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBwvfQvIxe14wJMbOvSoAGLeaG3t5KSsfM'
})(MapContainer)
