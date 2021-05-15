import Head from 'next/head'

import {SITE_TITLE} from '../utils/constants'
import BackButton from '../components/back_button'
import CommentsInner from '../components/comments'

export default function Comments({albums}) {
  return (
    <>
      <Head>
        <title>Comments - {SITE_TITLE}</title>
      </Head>

      <BackButton href="/" />
      <h1 className="mb-8 text-2xl font-semibold">Comments</h1>

      <CommentsInner />
    </>
  )
}
