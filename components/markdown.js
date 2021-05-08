import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

export default function Markdown({text}) {
  const components = {
    /* eslint-disable-next-line react/display-name */
    a: ({children, href}) => (
      href.startsWith('/') ?
        <Link href={href}><a>{children}</a></Link> :
        <a href={href} target="_blank" rel="noreferrer">{children}</a>
    ),
  }

  return (
    /* eslint-disable-next-line react/no-children-prop */
    <ReactMarkdown children={text} components={components} />
  )
}
