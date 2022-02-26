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

  return (
    <ReactMarkdown
      components={{
        a({ children, href }) {
          return String(href).startsWith('/') ? (
            <Link href={href}>
              <a>{children}</a>
            </Link>
          ) : (
            <a href={String(href)} target="_blank" rel="noreferrer">
              {children}
            </a>
          );
        },
        code({ node, inline, className, children, ...props }) {
          const matchLang = /language-(\w+)/.exec(className || '');
          const highlighterProps = {
            PreTag: 'div',
            language: matchLang ? matchLang[1] : null,
            style: darkMode.value ? tomorrow : coldarkCold,
            ...props,
          };
          return !inline && highlighterProps.language ? (
            <SyntaxHighlighter {...highlighterProps}>{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
      className="kvn-markdown"
    >
      {text}
    </ReactMarkdown>
  );
}
