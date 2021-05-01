import SVG from 'react-inlinesvg'

import { IMAGEKIT_ENDPOINT } from '../utils/constants'

export default function Image({ src, title, width, height, pad=false, ...props }) {
  const isSvg = src.toLowerCase().endsWith('.svg')

  const Tag = isSvg ? SVG : 'img'
  let newSrc = src
  if (!isSvg) {
    if (newSrc.startsWith('http') && !newSrc.startsWith(IMAGEKIT_ENDPOINT)) {
      newSrc = IMAGEKIT_ENDPOINT + newSrc
    }
    newSrc += `?tr=w-${width * 2},h-${height * 2}`
    if (pad) {
      newSrc += ',cm-pad_resize,bg-FFFFFF'
    } else {
      newSrc += ',c-at_max'
    }
  }

  return (
    <Tag src={newSrc} width={width} height={height} title={title} style={{width, height}} {...props} />
  )
}
