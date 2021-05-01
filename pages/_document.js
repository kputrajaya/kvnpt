import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  noFlash = function () {
    var key = 'darkMode';
    var clsDark = 'dark';
    var clsLight = 'light';
    var elm = document.documentElement;

    var useDark;
    try {
      useDark = JSON.parse(localStorage.getItem(key));
    } catch (err) {
      useDark = window.matchMedia
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
        : elm.classList.contains(clsDark);
      try {
        localStorage.setItem(key, JSON.stringify(useDark));
      } catch (err) { }
    }

    elm.classList.add(useDark ? clsDark : clsLight);
    elm.classList.remove(useDark ? clsLight : clsDark);
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <script dangerouslySetInnerHTML={{__html: `(${this.noFlash.toString()})();`}} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument
