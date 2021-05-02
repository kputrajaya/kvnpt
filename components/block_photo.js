import Link from 'next/link'

import { BLOCK_PHOTO_MAX_HEIGHT, BLOCK_PHOTO_MAX_WIDTH } from '../utils/constants'
import Image from './image'

export default function BlockPhoto({ block }) {
  let image = <Image src={block.image.url} width={BLOCK_PHOTO_MAX_WIDTH} height={BLOCK_PHOTO_MAX_HEIGHT} dynamicRatio />
  if (block.link?.url) {
    image = <a href={block.link.url} target="_blank">{image}</a>
  }

  return (
    <div className="text-center">
      <div className="inline-block">
        {image}
      </div>
      {
        block.caption &&
        <div className="mt-2 text-xs text-center italic text-scheme-third">
          {block.caption}
        </div>
      }
      {
        block.album &&
        <div className="mt-2 text-xs text-center italic text-scheme-third">
          Album: <Link href={`/photos/${block.album.slug}`}><a>{block.album.name}</a></Link>
        </div>
      }
    </div>
  )
}
