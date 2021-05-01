export default function BlockBlockquote({ block }) {
  return (
    <div>
      <div className="py-6 pl-7 pr-0 border-l-8">
        <blockquote className="italic">
          {block.body}
        </blockquote>
        {
          block.source &&
          <div className="mt-2 text-sm text-scheme-third">&mdash; {block.source}</div>
        }
      </div>
      {
        block.caption &&
        <div className="mt-2 text-xs text-center italic text-scheme-third">
          {block.caption}
        </div>
      }
    </div>
  )
}
