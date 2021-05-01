import SVG from 'react-inlinesvg'

import { IMAGEKIT_ENDPOINT } from '../utils/constants'

export default function Image({ src, title, width, height, dynamicRatio=false, ...props }) {
  const isSvg = src.startsWith('<svg') || src.toLowerCase().endsWith('.svg')

  const Tag = isSvg ? SVG : 'img'
  let newSrc = src
  if (!isSvg) {
    if (newSrc.startsWith('http') && !newSrc.startsWith(IMAGEKIT_ENDPOINT)) {
      newSrc = IMAGEKIT_ENDPOINT + newSrc
    }
    newSrc += `?tr=w-${width * 2},h-${height * 2}`
    if (dynamicRatio) {
      newSrc += ',c-at_max'
    }
  }
  const style = dynamicRatio
    ? {
      width: 'auto',
      maxWidth: width,
      maxHeight: height
    }
    : {
      width,
      minWidth: width,
      height
    }

  return (
    <Tag src={newSrc} width={width} height={height} title={title} style={style} {...props} />
  )
}
