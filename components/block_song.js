import Audio from './audio'

export default function BlockSong({ block }) {
  return (
    <div>
      <Audio src={block.audio.url} />
      {
        block.caption &&
        <div className="mt-2 text-xs text-center italic text-gray-400">
          {block.caption}
        </div>
      }
      {
        block.album &&
        <div className="mt-2 text-xs text-center italic text-gray-400">
          Album: <a href={`/songs/${block.album.slug}`}>{block.album.name}</a>
        </div>
      }
    </div>
  )
}