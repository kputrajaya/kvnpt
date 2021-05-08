import Markdown from './markdown'

export default function BlockParagraph({block}) {
  return (
    <div>
      <Markdown text={block.body} />
    </div>
  )
}
