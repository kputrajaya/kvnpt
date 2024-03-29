import Head from 'next/head';

import { SITE_TITLE } from '../utils/constants';
import BackButton from '../components/back_button';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>{`Not Found - ${SITE_TITLE}`}</title>
      </Head>

      <div className="-my-8 flex h-screen items-center justify-center py-8">
        <div className="text-center">
          <div className="text-5xl font-semibold">404</div>
          <h1 className="my-4 text-lg">Page does not exist.</h1>
          <BackButton href="/" />
        </div>
      </div>
    </>
  );
}
