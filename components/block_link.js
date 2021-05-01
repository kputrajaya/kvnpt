import Image from './image'

export default function BlockLink({ block }) {
  const renderLink = () => block.link.preview
    ? (
      <div className="flex">
        {
          block.link.preview.image &&
          (
            <Image src={block.link.preview.image} width={75} height={75} pad={true} className="mr-4 flex-shrink-0" />
          )
        }
        <div className="min-w-0">
          <div className="mb-1 font-bold truncate">{block.link.preview.title}</div>
          {
            block.link.preview.description &&
            <div className="mb-2 text-xs text-gray-400">{block.link.preview.description}</div>
          }
          <div className="text-xs text-gray-400">{block.link.preview.url}</div>
        </div>
      </div>
    )
    : (
      <div className="text-xs text-gray-400">{block.link.url}</div>
    )

  return (
    <div>
      <a className="w-full max-w-md mx-auto p-4 rounded no-underline border block" href={block.link.url} target="_blank">
        {renderLink()}
      </a>
      {
        block.caption &&
        <div className="mt-2 text-xs text-center italic text-gray-400">
          {block.caption}
        </div>
      }
    </div>
  )
}
