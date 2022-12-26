export default function BlockBlockquote({ block }) {
  return (
    <div>
      <div className="border-l-8 py-6 pl-7 pr-0">
        <blockquote className="italic">{block.body}</blockquote>
        {block.source && <div className="text-scheme-third mt-2 text-sm">&mdash; {block.source}</div>}
      </div>
      {block.caption && <div className="text-scheme-third mt-2 text-center text-xs italic">{block.caption}</div>}
    </div>
  );
}
