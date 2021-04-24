import SVG from 'react-inlinesvg'

export default function Image({ src, width, height, alt='', ...props }) {
  const isSvg = src.toLowerCase().endsWith('.svg')
  const attrs = {
    title: alt,
    style: {width, height},
    ...props
  }
  return (
    isSvg
      ? <SVG src={src} width={25} height={25} {...attrs} />
      : <img src={`${src}?tr=w-${width},h-${height}`} alt={alt} {...attrs} />
  )
}
