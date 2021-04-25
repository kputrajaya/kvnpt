import ReactMarkdown from 'react-markdown'

export default function BlockParagraph({ block }) {
  return (
    <ReactMarkdown children={block.body} />
  )
}
