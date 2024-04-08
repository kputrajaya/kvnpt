import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { SHORTIO_HOST, SITE_TITLE } from '../utils/constants';
import BackButton from '../components/back_button';

export default function Redirect() {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (!slug) return;

    window.location.href = `${SHORTIO_HOST}${slug}`;
  }, [slug]);

  return (
    <>
      <Head>
        <title>{`Redirect - ${SITE_TITLE}`}</title>
      </Head>

      <div className="-my-8 flex h-screen items-center justify-center py-8">
        <div className="text-center">
          <div className="text-5xl font-semibold">307</div>
          <h1 className="my-4 text-lg">Redirecting to external content.</h1>
          <BackButton href="/" />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params: { slug } }) {
  return {
    redirect: {
      destination: `${SHORTIO_HOST}${slug}`,
      permanent: false,
    },
  };
}
