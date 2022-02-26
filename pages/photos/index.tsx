import Head from 'next/head';
import Link from 'next/link';

import {
  PHOTO_ALBUM_TEASER_COUNT,
  PHOTO_ALBUM_TEASER_SIZE,
  SITE_TITLE,
  STATIC_PROPS_REVALIDATE,
} from '../../utils/constants';
import { getPhotoAlbums } from '../../utils/storyblok';
import BackButton from '../../components/back_button';
import Image from '../../components/image';
import PostSubtitle from '../../components/post_subtitle';

export default function Photos({ albums }) {
  return (
    <>
      <Head>
        <title>Photos - {SITE_TITLE}</title>
      </Head>

      <BackButton href="/" />
      <h1 className="mb-8 text-2xl font-semibold">Photos</h1>

      {albums.map((album, albumIndex) => (
        <Link href={`/photos/${album.slug}`} key={albumIndex}>
          <a className="kvn-card mb-4 block">
            <div className="-mt-4 -mx-4 mb-3 text-xs text-scheme-second leading-0 flex">
              {album.content.photos.slice(0, PHOTO_ALBUM_TEASER_COUNT).map((photo, photoIndex) => (
                <div className="w-3/12 relative" key={photoIndex}>
                  <Image
                    src={photo.image.url}
                    width={PHOTO_ALBUM_TEASER_SIZE}
                    height={PHOTO_ALBUM_TEASER_SIZE}
                    alt=""
                    title=""
                  />
                  {photoIndex === PHOTO_ALBUM_TEASER_COUNT - 1 &&
                    album.content.photos.length > PHOTO_ALBUM_TEASER_COUNT && (
                      <div className="font-semibold bg-scheme-75 flex items-center justify-center absolute inset-0">
                        +{album.content.photos.length - PHOTO_ALBUM_TEASER_COUNT + 1} more
                      </div>
                    )}
                </div>
              ))}
            </div>
            <h2 className="mb-1 font-semibold">{album.name}</h2>
            <h3 className="text-sm text-scheme-third">
              <PostSubtitle date={album.content.date} />
            </h3>
          </a>
        </Link>
      ))}
    </>
  );
}

export async function getStaticProps() {
  const resPhotoAlbums = await getPhotoAlbums();

  return {
    props: {
      albums: resPhotoAlbums.stories,
    },
    revalidate: STATIC_PROPS_REVALIDATE,
  };
}