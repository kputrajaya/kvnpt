export default function BackButton({ href }) {
  return (
    <a className="mb-4 text-sm text-gray-500 inline-block print:hidden" href={href}>&larr; Back</a>
  )
}
