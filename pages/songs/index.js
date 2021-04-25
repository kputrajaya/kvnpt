import Head from 'next/head'

import BackButton from '../../components/back_button'

export default function Songs() {
  return (
    <>
      <Head>
        <title>Songs - Kevin Putrajaya</title>
      </Head>

      <BackButton href="/" />
      <h1 className="mb-8 text-2xl font-bold">Songs</h1>

      <div>Coming soon</div>
    </>
  )
}
