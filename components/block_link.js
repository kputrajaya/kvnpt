export default function BlockLink({ block }) {
  return (
    <p>
      <div class="py-6 pl-7 pr-0 border-l-8">
        <a href={block.link.url}>{block.link.url}</a>
      </div>
      {
        block.caption &&
        <div class="mt-2 text-xs text-center italic text-gray-400">
          {block.caption}
        </div>
      }
    </p>
  )
}
