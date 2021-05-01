export default function BackButton({ href }) {
  return (
    <a className="mt-1.5 mb-4 text-sm text-scheme-third inline-block print:hidden" href={href}>&larr; Back</a>
  )
}
