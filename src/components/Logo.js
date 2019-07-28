import React from 'react'

const Logo = ({ height }) => (
  <img
    style={{ height: height }}
    alt='logo'
    src={require('../assets/images/wiwu-logo.png')}
  />
)

export default Logo
