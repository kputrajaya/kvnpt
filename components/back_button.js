import Link from 'next/link'

export default function BackButton({ href }) {
  return (
    <Link href={href}>
      <a className="mt-1.5 mb-4 text-sm inline-block print:hidden">&larr; Back</a>
    </Link>
  )
}
