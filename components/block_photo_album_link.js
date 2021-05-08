import { useState } from 'react'
import FsLightbox from 'fslightbox-react'

import { buildImageSrc } from '../utils/generics'
import Image from './image'

export default function BlockPhotoAlbumLink({ block }) {
  console.log(block)

  const [lightboxControl, setLightboxControl] = useState({toggler: false, index: 0})

  const lightboxSources = []
  const images = []
  const albums = new Set()
  block.photo_album.content.photos.forEach((photo) => {
    lightboxSources.push(buildImageSrc(photo.image.url, 1500, 1500, true))
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
          images.map((image, index) => (
            <div className="cursor-pointer w-6/12 md:w-4/12 inline-block" onClick={() => setLightboxControl({toggler: !lightboxControl.toggler, index})} key={index}>
              <Image src={image} width={350} height={350} />
            </div>
          ))
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
