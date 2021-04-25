import Head from 'next/head'

import BackButton from '../../components/back_button'

export default function Photos() {
  return (
    <>
      <Head>
        <title>Photos - Kevin Putrajaya</title>
      </Head>

      <BackButton href="/" />
      <h1 className="mb-8 text-2xl font-bold">Photos</h1>

      <div>Coming soon</div>
    </>
  )
}
