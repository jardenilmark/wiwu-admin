import React from 'react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

import Spinner from './Spinner'

const Map = ({ location, label }) => {
  const position = {
    lat: location.latitude,
    lng: location.longitude
  }
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBwvfQvIxe14wJMbOvSoAGLeaG3t5KSsfM'
  })

  const renderMap = () => {
    return (
      <GoogleMap
        center={position}
        mapTypeId='hybrid'
        labels={true}
        zoom={18}
        mapContainerStyle={{ height: '500px', width: '600px' }}>
        <Marker position={position} title={label} />
      </GoogleMap>
    )
  }

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? renderMap() : <Spinner tip='Loading Map...' height={500} />
}

export default Map
