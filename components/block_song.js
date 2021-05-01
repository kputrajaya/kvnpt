import Link from 'next/link'

import Audio from './audio'

export default function BlockSong({ block }) {
  return (
    <div>
      <Audio src={block.audio.url} />
      {
        block.caption &&
        <div className="mt-2 text-xs text-center italic text-scheme-third">
          {block.caption}
        </div>
      }
      {
        block.album &&
        <div className="mt-2 text-xs text-center italic text-scheme-third">
          Album: <Link href={`/songs/${block.album.slug}`}><a>{block.album.name}</a></Link>
        </div>
      }
    </div>
  )
}
