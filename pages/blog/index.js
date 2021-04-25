export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/blog/pages/1',
      permanent: true
    }
  }
}
