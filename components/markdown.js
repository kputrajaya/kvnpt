import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

export default function Markdown({ text }) {
  const components = {
    a: ({ children, href }) => (
      href.startsWith('/')
        ? <Link href={href}><a>{children}</a></Link>
        : <a href={href} target="_blank">{children}</a>
    )
  }

  return (
    <ReactMarkdown children={text} components={components} />
  )
}
