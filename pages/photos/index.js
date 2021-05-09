import Head from 'next/head'
import Link from 'next/link'

import {PHOTO_ALBUM_TEASER_COUNT, PHOTO_ALBUM_TEASER_SIZE, STATIC_PROPS_REVALIDATE} from '../../utils/constants'
import {getPhotoAlbums} from '../../utils/storyblok'
import BackButton from '../../components/back_button'
import Image from '../../components/image'

export default function Photos({albums}) {
  return (
    <>
      <Head>
        <title>Photos - Kevin Putrajaya</title>
      </Head>

      <BackButton href="/" />
      <h1 className="mb-8 text-2xl font-semibold">Photos</h1>

      {
        albums.map((album, index) => (
          <Link href={`/photos/${album.slug}`} key={index}>
            <a className="kvn-card mb-4 block">
              <div className="-mt-4 -mx-4 mb-3 text-xs text-scheme-second leading-0 flex">
                {
                  album.content.photos.slice(0, PHOTO_ALBUM_TEASER_COUNT).map((photo, index) => (
                    <div className="w-3/12 relative" key={index}>
                      <Image src={photo.image.url} width={PHOTO_ALBUM_TEASER_SIZE} height={PHOTO_ALBUM_TEASER_SIZE} />
                      {
                        index === PHOTO_ALBUM_TEASER_COUNT - 1 &&
                        album.content.photos.length > PHOTO_ALBUM_TEASER_COUNT &&
                        (
                          <div className="flex items-center justify-center absolute inset-0 bg-scheme-75">
                            +{album.content.photos.length - PHOTO_ALBUM_TEASER_COUNT + 1} more
                          </div>
                        )
                      }
                    </div>
                  ))
                }
              </div>
              <h2 className="mb-1 font-semibold">{album.name}</h2>
              <h3 className="text-sm text-scheme-third">{album.content.description}</h3>
            </a>
          </Link>
        ))
      }
    </>
  )
}

export async function getStaticProps({params}) {
  const resPhotoAlbums = await getPhotoAlbums()

  return {
    props: {
      albums: resPhotoAlbums.stories,
    },
    revalidate: STATIC_PROPS_REVALIDATE,
  }
}
