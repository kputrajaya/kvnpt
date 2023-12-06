import Head from 'next/head';
import Link from 'next/link';

import {
  PHOTO_ALBUM_TEASER_COUNT,
  PHOTO_ALBUM_TEASER_SIZE,
  SITE_TITLE,
  STATIC_PROPS_REVALIDATE,
} from '../../utils/constants';
import { PHOTO_ALBUMS } from '../../utils/contents';
import BackButton from '../../components/back_button';
import Image from '../../components/image';
import PostSubtitle from '../../components/post_subtitle';

export default function Photos({ albums }) {
  return (
    <>
      <Head>
        <title>{`Photos - ${SITE_TITLE}`}</title>
      </Head>

      <BackButton href="/" />
      <h1 className="mb-8 text-2xl font-semibold">Photos</h1>

      {albums.map((album) => (
        <Link className="kvn-card mb-4 block" href={`/photos/${album.slug}`} key={album.slug}>
          <div className="text-scheme-second -mx-4 -mt-4 mb-3 flex text-xs leading-0">
            {album.photos.slice(0, PHOTO_ALBUM_TEASER_COUNT).map((photo, photoIndex) => (
              <div className="relative w-3/12" key={photo}>
                <Image
                  src={photo}
                  width={PHOTO_ALBUM_TEASER_SIZE}
                  height={PHOTO_ALBUM_TEASER_SIZE}
                  alt={album.name}
                  title=""
                />
                {photoIndex === PHOTO_ALBUM_TEASER_COUNT - 1 && album.photos.length > PHOTO_ALBUM_TEASER_COUNT && (
                  <div className="bg-scheme-75 absolute inset-0 flex items-center justify-center font-semibold">
                    +{album.photos.length - PHOTO_ALBUM_TEASER_COUNT + 1} more
                  </div>
                )}
              </div>
            ))}
          </div>
          <h2 className="mb-1 font-semibold">{album.name}</h2>
          <h3 className="text-scheme-third text-sm">
            <PostSubtitle date={album.date} />
          </h3>
        </Link>
      ))}
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      albums: PHOTO_ALBUMS,
    },
    revalidate: STATIC_PROPS_REVALIDATE,
  };
}
