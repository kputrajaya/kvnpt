import Image from './image'

export default function BlockPhoto({ block }) {
  let image = <Image src={block.image.url} title={block.caption} width={1200} height={1200} style={{width: '100%', height: 'auto'}} />
  if (block.link && block.link.url) {
    image = <a href={block.link.url} target="_blank">{image}</a>
  }

  return (
    <div>
      {image}
      {
        block.caption &&
        <div className="mt-2 text-xs text-center italic text-gray-500">
          {block.caption}
        </div>
      }
      {
        block.album &&
        <div className="mt-2 text-xs text-center italic text-gray-500">
          Album: <a href={`/photo-albums/${block.album.slug}`}>{block.album.name}</a>
        </div>
      }
    </div>
  )
}
