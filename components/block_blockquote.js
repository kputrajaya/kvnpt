export default function BlockBlockquote({ block }) {
  return (
    <p>
      <div class="py-6 pl-7 pr-0 border-l-8">
        <blockquote class="text-lg italic">
          {block.body}
        </blockquote>
        {
          block.source &&
          <div class="mt-2 text-gray-400">&mdash; {block.source}</div>
        }
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
