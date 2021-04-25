import Head from 'next/head'

import BackButton from '../components/back_button'

export default function Resume() {
  return (
    <>
      <Head>
        <title>Resume - Kevin Putrajaya</title>
      </Head>

      <BackButton href="/" />
      <h1 className="mb-8 text-2xl font-bold">Resume</h1>

      <div>Coming soon</div>
    </>
  )
}
