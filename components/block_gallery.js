import { useState } from 'react'
import FsLightbox from 'fslightbox-react'

import { buildImageSrc } from '../utils/generics'
import Image from './image'

export default function BlockGallery({ block }) {
  const [lightboxControl, setLightboxControl] = useState({toggler: false, index: 0})

  const lightboxSources = []
  const images = []
  const albums = new Set()
  block.photos.forEach((photo) => {
    lightboxSources.push(buildImageSrc(photo.image.url, 1500, 1500, true))
    images.push(photo.image.url)
    if (photo.album) {
      albums.add(photo.album.slug)
    }
  })

  return (
    <div className="leading-0">
      {
        images.map((image, index) => (
          <div className="cursor-pointer sm:w-6/12 inline-block" onClick={() => setLightboxControl({toggler: !lightboxControl.toggler, index})} key={index}>
            <Image src={image} width={560} height={560} dynamicRatio />
          </div>
        ))
      }
      <FsLightbox
        sources={lightboxSources}
        toggler={lightboxControl.toggler}
        sourceIndex={lightboxControl.index}
      />
    </div>
  )
}
