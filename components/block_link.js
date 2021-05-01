import { BLOCK_LINK_IMAGE_SIZE } from '../utils/constants'
import Image from './image'

export default function BlockLink({ block }) {
  const renderLink = () => block.link.preview
    ? (
      <div className="flex">
        {
          block.link.preview.image &&
          <div className="mr-4 flex-shrink-0">
            <Image src={block.link.preview.image} width={BLOCK_LINK_IMAGE_SIZE} height={BLOCK_LINK_IMAGE_SIZE} dynamicRatio />
          </div>
        }
        <div className="min-w-0">
          <div className="mb-1 font-bold truncate">{block.link.preview.title}</div>
          {
            block.link.preview.description &&
            <div className="mb-2 text-xs text-scheme-third">{block.link.preview.description}</div>
          }
          <div className="text-xs text-scheme-third">{block.link.preview.url}</div>
        </div>
      </div>
    )
    : <div className="text-xs text-scheme-third">{block.link.url}</div>

  return (
    <div>
      <a className="kvn-card max-w-md mx-auto no-underline block" href={block.link.url} target="_blank">
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
