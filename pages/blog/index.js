export default function Blog() {
  return null
}

export async function getStaticProps() {
  return {
    redirect: {
      destination: '/blog/pages/1',
      permanent: true
    }
  }
}
