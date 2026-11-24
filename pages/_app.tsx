import Image from '../components/image';
import { SVG_SCHEME_SIZE } from '../utils/constants';
import { useDark } from '../utils/generics';
import SvgDark from '../public/images/scheme-dark.svg';
import SvgLight from '../public/images/scheme-light.svg';
import '../styles/globals.css' assert { type: 'css' };

function MyApp({ Component, pageProps }) {
  const darkMode = useDark();

  return (
    <>
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
              title="Dark Mode"
            />
          </button>
        )}
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
