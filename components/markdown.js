import dynamic from 'next/dynamic';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
const SyntaxHighlighter = dynamic(() => import('react-syntax-highlighter').then((mod) => mod.PrismAsyncLight), {
  ssr: false,
});
import { coldarkCold, tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { useDark } from '../utils/generics';

export default function Markdown({ text }) {
  const darkMode = useDark();

  const components = {
    a({ children, href }) {
      return href.startsWith('/') ? (
        <Link href={href}>
          <a>{children}</a>
        </Link>
      ) : (
        <a href={href} target="_blank" rel="noreferrer">
          {children}
        </a>
      );
    },
    code({ node, inline, className, children, ...props }) {
      const matchLang = /language-(\w+)/.exec(className || '');
      const style = darkMode.value ? tomorrow : coldarkCold;
      return !inline && matchLang ? (
        <SyntaxHighlighter PreTag="div" language={matchLang[1]} style={style} {...props}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <ReactMarkdown components={components} className="kvn-markdown">
      {text}
    </ReactMarkdown>
  );
}
