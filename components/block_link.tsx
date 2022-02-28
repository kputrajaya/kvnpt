import { BLOCK_LINK_IMAGE_SIZE } from '../utils/constants';
import Image from './image';

export default function BlockLink({ block }) {
  const renderLink = () =>
    block.link.preview ? (
      <div className="flex">
        {block.link.preview.image && (
          <div className="mr-4 shrink-0" style={{ width: BLOCK_LINK_IMAGE_SIZE }}>
            <Image
              src={block.link.preview.image}
              width={BLOCK_LINK_IMAGE_SIZE}
              height={BLOCK_LINK_IMAGE_SIZE}
              alt=""
              title=""
              dynamicRatio
            />
          </div>
        )}
        <div className="grow-1 min-w-0">
          <div className="-mt-1 mb-1 truncate font-semibold">{block.link.preview.title}</div>
          {block.link.preview.description && (
            <div className="text-scheme-second mb-2 text-xs">{block.link.preview.description}</div>
          )}
          <div className="text-scheme-third text-xs">{block.link.preview.url}</div>
        </div>
      </div>
    ) : (
      <div className="text-xs">{block.link.url}</div>
    );

  return (
    <div>
      <a className="kvn-card mx-auto block max-w-md" href={block.link.url} target="_blank" rel="noreferrer">
        {renderLink()}
      </a>
      {block.caption && <div className="text-scheme-third mt-2 text-center text-xs italic">{block.caption}</div>}
    </div>
  );
}
