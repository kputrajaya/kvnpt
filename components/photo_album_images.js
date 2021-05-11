import {useState} from 'react'
import FsLightbox from 'fslightbox-react'

import {PHOTO_ALBUM_IMAGE_SIZE, PHOTO_ALBUM_THUMB_SIZE} from '../utils/constants'
import {buildImageSrc} from '../utils/generics'
import Image from './image'

export default function PhotoAlbumImages({album, previewCount}) {
  const [lightboxControl, setLightboxControl] = useState({toggler: false, index: 0})
  const [expand, setExpand] = useState(false)

  const lightboxSources = []
  const images = []
  album.content.photos.forEach((photo) => {
    lightboxSources.push(buildImageSrc(
      photo.image.url, PHOTO_ALBUM_IMAGE_SIZE, PHOTO_ALBUM_IMAGE_SIZE, true))
    images.push(photo.image.url)
  })

  return (
    <div className="leading-0">
      <div className="-m-1 leading-0">
        {
          images
            .filter((image, index) => expand || index < previewCount)
            .map((image, index) => (
              <div
                className="cursor-pointer sm:w-6/12 p-1 inline-block"
                key={index}
              >
                <Image
                  src={image}
                  width={PHOTO_ALBUM_THUMB_SIZE}
                  height={PHOTO_ALBUM_THUMB_SIZE}
                  onClick={() => setLightboxControl({toggler: !lightboxControl.toggler, index})}
                />
              </div>
            ))
        }
      </div>
      {
        images.length > previewCount &&
        <button
          className="w-full mt-2 -mb-2 p-2 text-xs text-scheme-third text-center cursor-pointer"
          onClick={() => setExpand(!expand)}
        >
          {expand ? 'View less' : `View ${images.length - previewCount} more`} &hellip;
        </button>
      }
      <FsLightbox
        sources={lightboxSources}
        toggler={lightboxControl.toggler}
        sourceIndex={lightboxControl.index}
      />
    </div>
  )
}
