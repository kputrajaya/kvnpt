export default function BlockLink({ block }) {
  return (
    <div>
      <div className="py-6 pl-7 pr-0 border-l-8">
        <a href={block.link.url} target="_blank">{block.link.url}</a>
      </div>
      {
        block.caption &&
        <div className="mt-2 text-xs text-center italic text-gray-500">
          {block.caption}
        </div>
      }
    </div>
  )
}
