import Head from 'next/head'

import {SITE_TITLE} from '../../utils/constants'
import BackButton from '../../components/back_button'

export default function Songs() {
  return (
    <>
      <Head>
        <title>Songs - {SITE_TITLE}</title>
      </Head>

      <BackButton href="/" />
      <h1 className="mb-8 text-2xl font-semibold">Songs</h1>

      <div>Coming soon</div>
    </>
  )
}
