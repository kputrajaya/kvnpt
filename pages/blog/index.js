export default function Blog() {
  return null
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/blog/pages/1',
      permanent: true
    }
  }
}
