import React, { useRef, useState } from 'react'
import { Input } from 'antd'
import {
  GoogleMap,
  StandaloneSearchBox,
  Marker,
  useLoadScript
} from '@react-google-maps/api'

import Spinner from '../Spinner'

const SearchAddress = () => {
  let searchBox = useRef(null)
  const [position, setPosition] = useState()
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBwvfQvIxe14wJMbOvSoAGLeaG3t5KSsfM',
    libraries: ['places']
  })

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  if (!isLoaded) {
    return <Spinner tip='Loading Map...' height={500} />
  }

  return (
    <GoogleMap
      mapContainerStyle={{
        height: '400px',
        width: '100%'
      }}
      labels={true}
      zoom={15}
      options={{
        mapTypeControl: false,
        mapTypeId: 'hybrid'
      }}
      center={{
        lat: 10.7340198,
        lng: 122.5482992
      }}>
      <Marker position={position} />
      <StandaloneSearchBox
        onLoad={ref => (searchBox = ref)}
        onUnmount={ref => (searchBox = ref)}
        onPlacesChanged={() => {
          const places = searchBox.getPlaces()
          console.log(places)
          const location = places[0].geometry.location
          setPosition({
            lat: location.lat(),
            lng: location.lng()
          })
        }}>
        <Input
          placeholder='Search your address...'
          style={{
            border: '1px solid transparent',
            boxShadow: `0 2px 6px black`,
            borderRadius: 0,
            width: '300px',
            textOverflow: 'ellipses'
          }}
        />
      </StandaloneSearchBox>
    </GoogleMap>
  )
}

export default SearchAddress
