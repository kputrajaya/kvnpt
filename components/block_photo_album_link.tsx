import Link from 'next/link';

import { BLOCK_PHOTO_ALBUM_LINK_PREVIEW_COUNT } from '../utils/constants';
import { PHOTO_ALBUMS } from '../utils/contents';
import PhotoAlbumImages from './photo_album_images';
import PostSubtitle from './post_subtitle';

export default function BlockPhotoAlbumLink({ block }) {
  const album = PHOTO_ALBUMS.find((album) => album.slug === block.slug);

  return (
    <div className="kvn-card">
      <div className="mb-4">
        <div className="mb-1 text-lg font-semibold">
          <Link href={`/photos/${album.slug}`}>{album.name}</Link>
        </div>
        <div className="text-scheme-third text-sm">
          <PostSubtitle date={album.date} />
        </div>
      </div>

      <PhotoAlbumImages album={album} previewCount={BLOCK_PHOTO_ALBUM_LINK_PREVIEW_COUNT} />
    </div>
  );
}
