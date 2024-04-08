import { useState } from 'react';
import FsLightbox from 'fslightbox-react';

import { PHOTO_ALBUM_IMAGE_SIZE, PHOTO_ALBUM_THUMB_SIZE } from '../utils/constants';
import { buildImageSrc } from '../utils/generics';
import Image from './image';

export default function PhotoAlbumImages({ album, previewCount }) {
  const [lightboxControl, setLightboxControl] = useState({
    toggler: false,
    index: 0,
  });
  const [expand, setExpand] = useState(false);

  const lightboxSources = [];
  const images = [];
  album.photos.forEach((photo) => {
    lightboxSources.push(buildImageSrc(photo, PHOTO_ALBUM_IMAGE_SIZE, PHOTO_ALBUM_IMAGE_SIZE, true));
    images.push(photo);
  });

  return (
    <div className="leading-0">
      <div className="-m-1 leading-0">
        {images
          .filter((_, index) => expand || index < previewCount)
          .map((image, index) => (
            <div className="inline-block cursor-pointer p-1 sm:w-6/12" key={image}>
              <Image
                src={image}
                width={PHOTO_ALBUM_THUMB_SIZE}
                height={PHOTO_ALBUM_THUMB_SIZE}
                alt={album.name}
                title=""
                onClick={() =>
                  setLightboxControl({
                    toggler: !lightboxControl.toggler,
                    index,
                  })
                }
              />
            </div>
          ))}
      </div>
      {images.length > previewCount && (
        <button
          className="text-scheme-third mt-2 -mb-2 w-full cursor-pointer p-2 text-center text-xs"
          onClick={() => setExpand(!expand)}
        >
          {expand ? 'View less' : `View ${images.length - previewCount} more`} &hellip;
        </button>
      )}
      <FsLightbox sources={lightboxSources} toggler={lightboxControl.toggler} sourceIndex={lightboxControl.index} />
    </div>
  );
}
