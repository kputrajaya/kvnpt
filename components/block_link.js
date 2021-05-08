import {BLOCK_LINK_IMAGE_SIZE} from '../utils/constants'
import Image from './image'

export default function BlockLink({block}) {
  const renderLink = () => block.link.preview ?
    (
      <div className="flex">
        {
          block.link.preview.image &&
          <div className="mr-4 flex-shrink-0" style={{width: BLOCK_LINK_IMAGE_SIZE}}>
            <Image
              src={block.link.preview.image}
              width={BLOCK_LINK_IMAGE_SIZE}
              height={BLOCK_LINK_IMAGE_SIZE}
              dynamicRatio
            />
          </div>
        }
        <div className="min-w-0 flex-grow-1">
          <div className="-mt-1 mb-1 font-semibold truncate">{block.link.preview.title}</div>
          {
            block.link.preview.description &&
            <div className="mb-2 text-xs text-scheme-second">{block.link.preview.description}</div>
          }
          <div className="text-xs text-scheme-third">{block.link.preview.url}</div>
        </div>
      </div>
    ) :
    <div className="text-xs">{block.link.url}</div>

  return (
    <div>
      <a className="kvn-card max-w-md mx-auto block" href={block.link.url} target="_blank" rel="noreferrer">
        {renderLink()}
      </a>
      {
        block.caption &&
        <div className="mt-2 text-xs text-center italic text-scheme-third">
          {block.caption}
        </div>
      }
    </div>
  )
}
