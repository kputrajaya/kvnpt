import SVG from 'react-inlinesvg'

import { IMAGEKIT_HOST } from '../utils/constants'

export default function Image({ src, title, width, height, ...props }) {
  const isSvg = src.toLowerCase().endsWith('.svg')
  const attrs = {
    title,
    width,
    height,
    style: {width, height},
    ...props
  }
  return (
    isSvg
      ? <SVG src={src} {...attrs} />
      : <img src={src.startsWith(IMAGEKIT_HOST) ? `${src}?tr=w-${width},h-${height}` : src} {...attrs} />
  )
}
