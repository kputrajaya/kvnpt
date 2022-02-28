import { BLOCK_PHOTO_ALBUM_LINK_PREVIEW_COUNT } from '../utils/constants';
import PhotoAlbumImages from './photo_album_images';
import PostSubtitle from './post_subtitle';

export default function BlockPhotoAlbumLink({ block }) {
  return (
    <div className="kvn-card">
      <div className="mb-4">
        <div className="mb-1 text-lg font-semibold">
          <a href={`/photos/${block.photo_album.slug}`}>{block.photo_album.name}</a>
        </div>
        <div className="text-scheme-third text-sm">
          <PostSubtitle date={block.photo_album.content.date} />
        </div>
      </div>

      <PhotoAlbumImages album={block.photo_album} previewCount={BLOCK_PHOTO_ALBUM_LINK_PREVIEW_COUNT} />
    </div>
  );
}
