export default function Shortlink() {
  return null;
}

export async function getServerSideProps({ params: { slug } }) {
  return {
    redirect: {
      destination: `https://r.kvn.pt/${slug}`,
      permanent: false,
    },
  };
}
