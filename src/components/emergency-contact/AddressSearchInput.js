import React, { useRef, useState, useEffect } from 'react'
import { Form, Input } from 'antd'
import {
  GoogleMap,
  Autocomplete,
  Marker,
  useLoadScript
} from '@react-google-maps/api'
import * as PropTypes from 'prop-types'

import Spinner from '../Spinner'

const libraries = ['places']
const { Item } = Form

const AddressSearchInput = ({
  values,
  errors,
  touched,
  handleBlur,
  setFieldValue,
  isSubmitting
}) => {
  const searchBox = useRef(null)
  const [position, setPosition] = useState(null)
  const [center, setCenter] = useState({
    lat: 10.6952099,
    lng: 122.5646901
  })

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBvUkXmNQ5VDKN46EYEPy8QuHluzzpxvog',
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
  }, [values.location])

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  if (!isLoaded) {
    return <Spinner tip='Loading Map...' height={300} />
  }

  return (
    <Item
      label='Address'
      help={errors.address && touched.address ? errors.address : ''}
      validateStatus={errors.address && touched.address ? 'error' : ''}
      required>
      <GoogleMap
        mapContainerStyle={{
          height: '250px',
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
        <Autocomplete
          restrictions={{ country: 'ph' }}
          onLoad={ref => (searchBox.current = ref)}
          onPlaceChanged={() => {
            const place = searchBox.current.getPlace()
            const location = place.geometry.location
            setFieldValue('address', place.formatted_address)
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
            disabled={isSubmitting}
            value={values.address}
            onBlur={handleBlur}
            onChange={event => {
              event.preventDefault()
              setFieldValue('address', event.target.value)
            }}
            style={{
              boxShadow: `0 2px 6px black`,
              borderRadius: '0px',
              width: '400px',
              textOverflow: 'ellipsis'
            }}
          />
        </Autocomplete>
      </GoogleMap>
    </Item>
  )
}

AddressSearchInput.propTypes = {
  values: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleBlur: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired
}

export default AddressSearchInput
