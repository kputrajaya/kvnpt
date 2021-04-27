import Image from './image'

export default function BlockLink({ block }) {
  return (
    <div>
      <a className="w-full max-w-md mx-auto p-4 rounded no-underline border block" href={block.link.url} target="_blank">
        <div className="flex">
          {
            block.link.preview.image &&
            (
              <Image src={block.link.preview.image} width={100} height={100} pad={true} className="mr-4 flex-shrink-0" />
            )
          }
          <div>
            <div className="text-lg font-bold">{block.link.preview.title}</div>
            <div className="text-sm text-gray-500">{block.link.preview.description}</div>
            <div className="text-xs text-gray-500">{block.link.preview.url}</div>
          </div>
        </div>
      </a>
      {
        block.caption &&
        <div className="mt-2 text-xs text-center italic text-gray-500">
          {block.caption}
        </div>
      }
    </div>
  )
}
