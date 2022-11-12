import Head from 'next/head';
import { usePostHog } from 'next-use-posthog';

import Image from '../components/image';
import {
  POSTHOG_HOST,
  POSTHOG_KEY,
  SITE_DESCRIPTION,
  SITE_IMAGE,
  SITE_TWITTER_USER,
  SVG_SCHEME_SIZE,
} from '../utils/constants';
import { useDark } from '../utils/generics';
import SvgDark from '../public/images/scheme-dark.svg';
import SvgLight from '../public/images/scheme-light.svg';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  usePostHog(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') {
        posthog.opt_out_capturing();
      }
    },
  });
  const darkMode = useDark();

  return (
    <>
      <Head>
        <meta property="og:image" content={SITE_IMAGE} />
        <meta property="og:description" content={SITE_DESCRIPTION} />

        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:creator" content={SITE_TWITTER_USER} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />

        <meta name="description" content={SITE_DESCRIPTION} />
      </Head>

      <div className="container relative mx-auto max-w-3xl p-8">
        <Component {...pageProps} />
        {darkMode && (
          <div
            className="bg-scheme absolute top-8 right-8 cursor-pointer rounded-full p-2 leading-0 print:hidden"
            title="Dark Mode"
            onClick={darkMode.toggle}
          >
            <Image
              src={darkMode.value ? SvgDark : SvgLight}
              width={SVG_SCHEME_SIZE}
              height={SVG_SCHEME_SIZE}
              alt="Dark Mode"
              title=""
            />
          </div>
        )}
      </div>
    </>
  );
}

export default MyApp;
