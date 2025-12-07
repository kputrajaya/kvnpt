import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Image from '../components/image';
import { SITE_DESCRIPTION, SITE_IMAGE, SITE_TWITTER_USER, SVG_SCHEME_SIZE } from '../utils/constants';
import { useDark } from '../utils/generics';
import SvgDark from '../public/images/scheme-dark.svg';
import SvgLight from '../public/images/scheme-light.svg';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const darkMode = useDark();

  return (
    <>
      <Head>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="icon" href="/favicon.ico" sizes="any" />

        <meta property="og:image" content={SITE_IMAGE} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:creator" content={SITE_TWITTER_USER} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
      </Head>

      <div className="container relative mx-auto max-w-3xl p-8">
        {darkMode && (
          <button
            className="bg-scheme absolute top-8 right-8 cursor-pointer rounded-full p-2 leading-0! print:hidden"
            type="button"
            title="Dark Mode"
            onClick={darkMode.toggle}
          >
            <Image
              src={darkMode.value ? SvgDark : SvgLight}
              width={SVG_SCHEME_SIZE}
              height={SVG_SCHEME_SIZE}
              title=""
            />
          </button>
        )}
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
