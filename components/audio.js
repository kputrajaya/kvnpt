import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

export default function Audio({songs, index, setIndex}) {
  return (
    <>
      <div className="mb-24"></div>
      <div className="fixed bottom-0 inset-x-0">
        <AudioPlayer
          autoPlay
          autoPlayAfterSrcChange={true}
          showJumpControls={false}
          showSkipControls={true}
          src={songs[index]?.audio?.url}
          onClickPrevious={() => setIndex(Math.max(0, index - 1))}
          onClickNext={() => setIndex(Math.max(0, Math.min(songs.length - 1, index + 1)))}
          className="w-full"
        />
      </div>
    </>
  )
}
