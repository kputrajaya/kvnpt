import Head from 'next/head';

import { PHOTO_ALBUM_PREVIEW_COUNT, SITE_TITLE, STATIC_PROPS_REVALIDATE } from '../../utils/constants';
import { PHOTO_ALBUMS } from '../../utils/contents';
import BackButton from '../../components/back_button';
import PhotoAlbumImages from '../../components/photo_album_images';
import PostSubtitle from '../../components/post_subtitle';

export default function Photo({ album }) {
  if (!album) return null;

  return (
    <>
      <Head>
        <title>{`${album.name} - ${SITE_TITLE}`}</title>
      </Head>

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
  return { paths: [], fallback: true };
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
