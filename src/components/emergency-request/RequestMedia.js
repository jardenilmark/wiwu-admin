import React from 'react'
import PropTypes from 'prop-types'
import { Spin, Tooltip } from 'antd'
import ProgressiveImage from 'react-progressive-image'
import styled from 'styled-components'

const StyledImage = styled.img`
  width: 100%;
  &:hover {
    cursor: pointer;
  }
`

const StyledVideo = styled.video`
  width: 100%;
  &:hover {
    cursor: pointer;
  }
`

const RequestMedia = props => {
  const { media, setMediaModalOpen, setMedia, isSpamRequestsVisible } = props
  return media.ext === 'jpg' ? (
    <ProgressiveImage src={media.url} placeholder='media'>
      {(src, loading) =>
        loading ? (
          <Spin style={{ margin: 24 }} spinning={true} />
        ) : (
          <Tooltip title={'Enlarge media'}>
            <StyledImage
              onClick={() => {
                setMediaModalOpen(true)
                setMedia(media)
              }}
              height={isSpamRequestsVisible ? 100 : 200}
              src={src}
              alt={'media'}
              style={{ objectFit: 'cover' }}
            />
          </Tooltip>
        )
      }
    </ProgressiveImage>
  ) : (
    <StyledVideo
      onClick={() => {
        setMediaModalOpen(true)
        setMedia(media)
      }}
      height={isSpamRequestsVisible ? 100 : 200}
      src={media.url}
      style={{ objectFit: 'cover' }}
    />
  )
}

RequestMedia.propTypes = {
  media: PropTypes.object.isRequired,
  setMediaModalOpen: PropTypes.func.isRequired,
  setMedia: PropTypes.func.isRequired,
  isSpamRequestsVisible: PropTypes.bool.isRequired
}

export default RequestMedia
