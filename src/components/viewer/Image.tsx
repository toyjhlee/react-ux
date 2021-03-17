// @ts-ignore
import getStyleProp from 'desandro-get-style-property'
import React from 'react'

const supportsObjectFit = !!getStyleProp('objectFit')

export type ObjectFit = 'contain' | 'cover' | 'original'

interface ImageProps {
  url: string
  type: ObjectFit
  disabledObjectFit: boolean
}

Image.defaultProps = {
  type: 'original',
  disabledObjectFit: false,
}

function Image(props: ImageProps) {
  let isUsingObjectFit = supportsObjectFit && props.type !== 'original'

  if (props.disabledObjectFit) {
    isUsingObjectFit = false
  }

  if (!isUsingObjectFit) {
    return (
      <div
        style={{
          backgroundImage: `url(${props.url})`,
          backgroundSize: props.type,
          backgroundPosition: 'center center',
          position: 'relative',
          minWidth: '100%',
          minHeight: '100%',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
    )
  }

  return (
    <img
      src={props.url}
      style={{
        width: '100%',
        height: '100%',
        objectFit:
          props.type === 'contain'
            ? 'contain'
            : props.type === 'cover'
            ? 'cover'
            : 'none',
      }}
    />
  )
}

export default Image
