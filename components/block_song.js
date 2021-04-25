import Audio from './audio'

export default function BlockSong({ block }) {
  return (
    <p>
      <Audio src={block.audio.url} />
      {
        block.caption &&
        <div class="mt-2 text-xs text-center italic text-gray-400">
          {block.caption}
        </div>
      }
      {
        block.album &&
        <div class="text-xs text-center italic text-gray-400">
          Album: <a href={`/song-albums/${block.album.slug}`}>{block.album.name}</a>
        </div>
      }
    </p>
  )
}
