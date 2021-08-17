import Head from 'next/head';

import { SITE_TITLE } from '../utils/constants';
import BackButton from '../components/back_button';

export default function Custom500() {
  return (
    <>
      <Head>
        <title>Internal Server Error - {SITE_TITLE}</title>
      </Head>

      <div className="h-screen -my-8 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl font-semibold">500</div>
          <h1 className="my-4 text-lg">Something went wrong.</h1>
          <BackButton href="/" />
        </div>
      </div>
    </>
  );
}
