import SVG from 'react-inlinesvg'

import { IMAGEKIT_ENDPOINT } from '../utils/constants'

export default function Image({ src, title, width, height, ...props }) {
  const isSvg = src.toLowerCase().endsWith('.svg') || src.toLowerCase().startsWith('<svg')

  const Tag = isSvg ? SVG : 'img'
  let newSrc = src
  if (!isSvg) {
    if (newSrc.startsWith('http') && !newSrc.startsWith(IMAGEKIT_ENDPOINT)) {
      newSrc = IMAGEKIT_ENDPOINT + newSrc
    }
    newSrc += `?tr=w-${width * 2},h-${height * 2},c-at_max`
  }
  const style = {
    width: 'auto',
    maxWidth: width
  }

  return (
    <Tag src={newSrc} width={width} height={height} title={title} style={style} {...props} />
  )
}
