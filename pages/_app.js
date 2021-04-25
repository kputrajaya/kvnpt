import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className="container max-w-3xl mx-auto p-8">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
