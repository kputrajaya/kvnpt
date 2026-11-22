import { useEffect, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export default function Audio({ songs, index, isPlaying, setIndex, setIsPlaying }) {
  const playerRef = useRef(null);
  const previous = () => {
    setIndex(Math.max(0, index - 1));
    setIsPlaying(true);
  };
  const next = () => {
    setIndex(Math.max(0, Math.min(songs.length - 1, index + 1)));
    setIsPlaying(true);
  };

  useEffect(() => {
    const audio = playerRef.current?.audio.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying, index, setIsPlaying]);

  return (
    <>
      <div className="mb-24"></div>
      <div className="kvn-audio fixed inset-x-0 bottom-0">
        <AudioPlayer
          ref={playerRef}
          autoPlayAfterSrcChange={true}
          showFilledVolume={true}
          showJumpControls={false}
          showSkipControls={true}
          src={songs[index]?.audio}
          onClickPrevious={previous}
          onClickNext={next}
          onEnded={next}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>
    </>
  );
}
