import SVG from 'react-inlinesvg'

export default function Image({ src, width, height, ...props }) {
  const isSvg = src.toLowerCase().endsWith('.svg')
  const attrs = {
    width,
    height,
    style: {width, height},
    ...props
  }
  return (
    isSvg
      ? <SVG src={src} {...attrs} />
      : <img src={`${src}?tr=w-${width},h-${height}`} {...attrs} />
  )
}
