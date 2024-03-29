import { BLOCK_PHOTO_MAX_HEIGHT, BLOCK_PHOTO_MAX_WIDTH } from '../utils/constants';
import Image from './image';

export default function BlockPhoto({ block }) {
  let image = (
    <Image
      src={block.image.url}
      width={BLOCK_PHOTO_MAX_WIDTH}
      height={BLOCK_PHOTO_MAX_HEIGHT}
      alt={block.caption || 'Image'}
      title=""
      dynamicRatio
    />
  );
  if (block.link?.url) {
    image = (
      <a href={block.link.url} target="_blank" rel="noreferrer">
        {image}
      </a>
    );
  }

  return (
    <div className="text-center">
      <div className="inline-block">{image}</div>
      {block.caption && <div className="text-scheme-third mt-2 text-center text-xs italic">{block.caption}</div>}
    </div>
  );
}
