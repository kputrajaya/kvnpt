import Head from 'next/head'
import useDarkMode from 'use-dark-mode'

import Image from '../components/image'
import {SITE_DESCRIPTION, SITE_IMAGE, SITE_TWITTER_USER, SVG_SCHEME_SIZE} from '../utils/constants'
import SvgDark from '../public/images/scheme-dark.svg'
import SvgLight from '../public/images/scheme-light.svg'
import '../styles/globals.css'

function MyApp({Component, pageProps}) {
  const darkMode = typeof window !== 'undefined' ?
    useDarkMode(true, {
      classNameDark: 'dark',
      classNameLight: 'light',
      element: document.documentElement,
    }) :
    null

  return (
    <>
      <Head>
        <meta property="og:image" content={SITE_IMAGE} />
        <meta property="og:description" content={SITE_DESCRIPTION} />

        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta name="twitter:creator" content={SITE_TWITTER_USER} />
        <meta property="twitter:description" content={SITE_DESCRIPTION} />

        <meta name="description" content={SITE_DESCRIPTION} />
      </Head>

      <div className="container max-w-3xl mx-auto p-8 relative">
        <Component {...pageProps} />
        {
          darkMode &&
          <div
            className="p-2 bg-scheme rounded-full leading-0 absolute top-8 right-8 cursor-pointer print:hidden"
            title="Dark mode"
            onClick={darkMode.toggle}
          >
            <Image src={darkMode.value ? SvgDark : SvgLight} width={SVG_SCHEME_SIZE} height={SVG_SCHEME_SIZE} />
          </div>
        }
      </div>
    </>
  )
}

export default MyApp
