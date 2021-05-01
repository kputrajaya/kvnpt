import useDarkMode from 'use-dark-mode'

import Image from '../components/image'
import SvgDark from '../public/images/scheme-dark.svg'
import SvgLight from '../public/images/scheme-light.svg'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  let darkMode = null
  if (typeof window !== 'undefined') {
    darkMode = useDarkMode(true, {
      classNameDark: 'dark',
      classNameLight: 'light',
      element: document.documentElement
    })
  }

  return (
    <div className="container max-w-3xl mx-auto p-8 relative">
      <Component {...pageProps} />
      {
        darkMode &&
        <div className="p-2 bg-scheme rounded-full leading-none absolute top-8 right-8 cursor-pointer" title="Dark mode" onClick={darkMode.toggle}>
          <Image src={darkMode.value ? SvgDark : SvgLight} width={19} height={19} />
        </div>
      }
    </div>
  )
}

export default MyApp
