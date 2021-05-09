import {BLOCK_PHOTO_ALBUM_LINK_PREVIEW_COUNT} from '../utils/constants'
import PhotoAlbumImages from './photo_album_images'

export default function BlockPhotoAlbumLink({block}) {
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

      <PhotoAlbumImages album={block.photo_album} previewCount={BLOCK_PHOTO_ALBUM_LINK_PREVIEW_COUNT} />
    </div>
  )
}
