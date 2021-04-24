export default function Image({ src, width, height, ...props }) {
  const url = `${src}?tr=w-${width},h-${height}`;
  return (
    <img src={url} {...props} style={{width, height}} />
  )
}
