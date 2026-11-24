import {
  IMAGEKIT_ENDPOINT,
  PHOTO_ALBUM_PREVIEW_COUNT,
  PHOTO_ALBUMS,
  SITE_NAME,
  SITE_URL,
  STATIC_PROPS_REVALIDATE,
} from '../../utils/constants';
import { getBreadcrumb } from '../../utils/seo';
import BackButton from '../../components/back_button';
import PhotoAlbumImages from '../../components/photo_album_images';
import PostSubtitle from '../../components/post_subtitle';
import Seo from '../../components/seo';

export default function Photo({ album }) {
  if (!album) return null;

  const path = `/photos/${album.slug}`;
  const image = album.photos[0] ? `${IMAGEKIT_ENDPOINT}${album.photos[0]}` : undefined;
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'ImageGallery',
      name: album.name,
      url: `${SITE_URL}${path}`,
      image: album.photos.slice(0, 6).map((photo) => `${IMAGEKIT_ENDPOINT}${photo}`),
      author: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
      datePublished: album.date,
    },
    getBreadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Photos', path: '/photos' },
      { name: album.name, path },
    ]),
  ];

  return (
    <>
      <Seo
        title={album.name}
        description={`Photo album ${album.name} by ${SITE_NAME}.`}
        path={path}
        image={image}
        type="article"
        jsonLd={structuredData}
      />

      <BackButton href="/photos" />
      <h1 className="mb-2 text-2xl font-semibold">{album.name}</h1>
      <h3 className="text-scheme-third mb-8 text-sm">
        <PostSubtitle date={album.date} />
      </h3>

      <div className="mb-8">
        <PhotoAlbumImages album={album} previewCount={PHOTO_ALBUM_PREVIEW_COUNT} />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  // Get album for current slug
  const resAlbum = PHOTO_ALBUMS.find((album) => album.slug === params.slug);
  if (!resAlbum) return { notFound: true };

  return {
    props: {
      album: resAlbum,
    },
    revalidate: STATIC_PROPS_REVALIDATE,
  };
}
