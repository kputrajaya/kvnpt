import Image from './image'

export default function BlockPhoto({ block }) {
  return (
    <p>
      <Image src={block.image.url} title={block.caption} width={1200} height={1200} style={{width: '100%', height: 'auto'}} />
      {
        block.caption &&
        <div class="mt-2 text-xs text-center italic text-gray-400">
          {block.caption}
        </div>
      }
      {
        block.album &&
        <div class="text-xs text-center italic text-gray-400">
          Album: <a href={`/photo-albums/${block.album.slug}`}>{block.album.name}</a>
        </div>
      }
    </p>
  )
}
