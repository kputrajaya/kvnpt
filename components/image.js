import SVG from 'react-inlinesvg'

import { buildImageSrc } from '../utils/generics'

export default function Image({ src, title, width, height, dynamicRatio=false, ...props }) {
  const isSvg = src.startsWith('<svg') || src.toLowerCase().endsWith('.svg')

  const Tag = isSvg ? SVG : 'img'
  const newSrc = isSvg ? src : buildImageSrc(src, width, height, dynamicRatio)
  const style = dynamicRatio
    ? {
      width: 'auto',
      maxWidth: '100%',
      height: 'auto',
      maxHeight: height
    }
    : {
      width,
      height: 'auto'
    }

  return (
    <Tag src={newSrc} width={width} height={height} title={title} style={style} {...props} />
  )
}
