import Document, {Html, Head, Main, NextScript} from 'next/document'
import Uglify from 'uglify-js'

class MyDocument extends Document {
  render() {
    const init = function() {
      const key = 'darkMode'
      const clsDark = 'dark'
      const clsLight = 'light'
      const elm = document.documentElement

      let useDark
      try {
        useDark = JSON.parse(localStorage.getItem(key))
      } catch (err) {
        useDark = window.matchMedia ?
          window.matchMedia('(prefers-color-scheme: dark)').matches :
          elm.classList.contains(clsDark)
        try {
          localStorage.setItem(key, JSON.stringify(useDark))
        } catch (err) {}
      }

      elm.classList.add(useDark ? clsDark : clsLight)
      elm.classList.remove(useDark ? clsLight : clsDark)
    }
    const initScript = Uglify.minify(`(${init.toString()})();`).code

    return (
      <Html lang="en">
        <Head />
        <body>
          <script dangerouslySetInnerHTML={{__html: initScript}} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
