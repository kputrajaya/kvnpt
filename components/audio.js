import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

export default function Audio({songs, index, setIndex}) {
  const previous = () => setIndex(Math.max(0, index - 1))
  const next = () => setIndex(Math.max(0, Math.min(songs.length - 1, index + 1)))

  return (
    <>
      <div className="mb-24"></div>
      <div className="kvn-audio fixed bottom-0 inset-x-0">
        <AudioPlayer
          autoPlayAfterSrcChange={true}
          showFilledVolume={true}
          showJumpControls={false}
          showSkipControls={true}
          src={songs[index]?.audio?.url}
          onClickPrevious={previous}
          onClickNext={next}
          onEnded={next}
        />
      </div>
    </>
  )
}
