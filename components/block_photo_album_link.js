import {useState} from 'react'
import FsLightbox from 'fslightbox-react'

import {
  BLOCK_PHOTO_ALBUM_LINK_IMAGE_SIZE,
  BLOCK_PHOTO_ALBUM_LINK_PREVIEW_COUNT,
  BLOCK_PHOTO_ALBUM_LINK_THUMB_SIZE,
} from '../utils/constants'
import {buildImageSrc} from '../utils/generics'
import Image from './image'

export default function BlockPhotoAlbumLink({block}) {
  const [lightboxControl, setLightboxControl] = useState({toggler: false, index: 0})
  const [expand, setExpand] = useState(false)

  const lightboxSources = []
  const images = []
  const albums = new Set()
  block.photo_album.content.photos.forEach((photo) => {
    lightboxSources.push(buildImageSrc(
      photo.image.url, BLOCK_PHOTO_ALBUM_LINK_IMAGE_SIZE, BLOCK_PHOTO_ALBUM_LINK_IMAGE_SIZE, true))
    images.push(photo.image.url)
    if (photo.album) {
      albums.add(photo.album.slug)
    }
  })

  return (
    <div className="kvn-card">
      <div className="mb-4">
        <div className="text-lg font-semibold">
          <a href={`/photos/${block.photo_album.slug}`}>{block.photo_album.name}</a>
        </div>
        {
          block.photo_album.content.description &&
          <div className="text-sm text-scheme-third">{block.photo_album.content.description}</div>
        }
      </div>
      <div className="leading-0">
        {
          images
            .filter((image, index) => expand || index < BLOCK_PHOTO_ALBUM_LINK_PREVIEW_COUNT)
            .map((image, index) => (
              <div
                className="cursor-pointer sm:w-6/12 inline-block"
                onClick={() => setLightboxControl({toggler: !lightboxControl.toggler, index})}
                key={index}
              >
                <Image
                  src={image}
                  width={BLOCK_PHOTO_ALBUM_LINK_THUMB_SIZE}
                  height={BLOCK_PHOTO_ALBUM_LINK_THUMB_SIZE}
                />
              </div>
            ))
        }
        {
          images.length > BLOCK_PHOTO_ALBUM_LINK_PREVIEW_COUNT &&
          <button
            className="w-full mt-2 -mb-2 p-2 text-xs text-scheme-third text-center cursor-pointer"
            onClick={() => setExpand(!expand)}
          >
            {expand ? 'View less' : `View ${images.length - BLOCK_PHOTO_ALBUM_LINK_PREVIEW_COUNT} more`} &hellip;
          </button>
        }
        <FsLightbox
          sources={lightboxSources}
          toggler={lightboxControl.toggler}
          sourceIndex={lightboxControl.index}
        />
      </div>
    </div>
  )
}
