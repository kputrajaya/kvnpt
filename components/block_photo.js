import Image from './image'
import { BLOCK_PHOTO_MAX_HEIGHT, BLOCK_PHOTO_MAX_WIDTH } from '../utils/constants'

export default function BlockPhoto({ block }) {
  const style = {
    width: 'auto',
    maxWidth: '100%',
    maxHeight: `${BLOCK_PHOTO_MAX_HEIGHT}px`
  }
  let image = <Image src={block.image.url} width={BLOCK_PHOTO_MAX_WIDTH} height={BLOCK_PHOTO_MAX_HEIGHT} style={style} />
  if (block.link && block.link.url) {
    image = <a href={block.link.url} target="_blank">{image}</a>
  }

  return (
    <div className="text-center">
      <div className="inline-block">
        {image}
      </div>
      {
        block.caption &&
        <div className="mt-2 text-xs text-center italic text-gray-500">
          {block.caption}
        </div>
      }
      {
        block.album &&
        <div className="mt-2 text-xs text-center italic text-gray-500">
          Album: <a href={`/photos/${block.album.slug}`}>{block.album.name}</a>
        </div>
      }
    </div>
  )
}
