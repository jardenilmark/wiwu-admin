import React, { useRef, useState, useEffect } from 'react'
import { Input } from 'antd'
import {
  GoogleMap,
  StandaloneSearchBox,
  Marker,
  useLoadScript
} from '@react-google-maps/api'

import Spinner from '../Spinner'

const libraries = ['places']

const AddressSearchInput = ({ values, setFieldValue, handleBlur }) => {
  let searchBox = useRef(null)
  const [position, setPosition] = useState(null)
  const [center, setCenter] = useState({
    lat: 10.6952099,
    lng: 122.5646901
  })

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBwvfQvIxe14wJMbOvSoAGLeaG3t5KSsfM',
    libraries
  })

  useEffect(() => {
    if (values.location) {
      const loc = values.location
      setPosition({
        lat: loc.latitude,
        lng: loc.longitude
      })
      setCenter({
        lat: loc.latitude,
        lng: loc.longitude
      })
    }
  }, [])

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  if (!isLoaded) {
    return <Spinner tip='Loading Map...' height={300} />
  }

  return (
    <GoogleMap
      mapContainerStyle={{
        height: '300px',
        width: '100%'
      }}
      labels={true}
      zoom={15}
      options={{
        mapTypeControl: false,
        mapTypeId: 'hybrid'
      }}
      center={center}>
      <Marker position={position} />
      <StandaloneSearchBox
        onLoad={ref => (searchBox.current = ref)}
        onPlacesChanged={() => {
          const places = searchBox.current.getPlaces()
          const location = places[0].geometry.location
          setFieldValue('address', places[0].formatted_address)
          setPosition({
            lat: location.lat(),
            lng: location.lng()
          })
          setCenter({
            lat: location.lat(),
            lng: location.lng()
          })
        }}>
        <Input
          name='address'
          placeholder='Search your address...'
          value={values.address}
          onBlur={handleBlur}
          onChange={event => setFieldValue('address', event.target.value)}
          style={{
            border: '1px solid transparent',
            boxShadow: `0 2px 6px black`,
            borderRadius: 0,
            width: '400px',
            textOverflow: 'ellipses'
          }}
        />
      </StandaloneSearchBox>
    </GoogleMap>
  )
}

export default AddressSearchInput
