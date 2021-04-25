import ReactMarkdown from 'react-markdown'

export default function BlockParagraph({ block }) {
  return (
    <div>
      <ReactMarkdown children={block.body} />
    </div>
  )
}
