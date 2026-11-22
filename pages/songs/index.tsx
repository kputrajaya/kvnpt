import { useEffect, useState } from 'react';
import Head from 'next/head';

import { SITE_TITLE, STATIC_PROPS_REVALIDATE, SVG_INFO_SIZE, SVG_SONG_SIZE, SONG_ALBUMS } from '../../utils/constants';
import Audio from '../../components/audio';
import BackButton from '../../components/back_button';
import Image from '../../components/image';
import SvgSongInfo from '../../public/images/song-info.svg';
import SvgSongPlay from '../../public/images/song-play.svg';
import SvgSongPlaying from '../../public/images/song-playing.svg';

export default function Songs({ albums }) {
  const [playIndex, setPlayIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const playableSongs = [];
  let counter = 0;

  const handleSongClick = (index) => {
    if (index === playIndex) {
      setIsPlaying(!isPlaying);
      return;
    }
    setPlayIndex(index);
    setIsPlaying(true);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code !== 'Space' || event.repeat) return;
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
      ) {
        return;
      }
      if (playIndex < 0) return;
      event.preventDefault();
      setIsPlaying((value) => !value);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playIndex]);

  return (
    <>
      <Head>
        <title>{`Songs - ${SITE_TITLE}`}</title>
      </Head>

      <BackButton href="/" />
      <h1 className="mb-8 text-2xl font-semibold">Songs</h1>

      {albums.map((album) => (
        <div className="kvn-card mb-8" key={album.name}>
          <h2 className="mb-4 font-semibold">
            {album.name}
            {album.link && (
              <a
                className="-my-px inline-block px-2 py-1 align-middle"
                href={album.link}
                target="_blank"
                rel="noreferrer"
              >
                <Image src={SvgSongInfo} width={SVG_INFO_SIZE} height={SVG_INFO_SIZE} title="Info" />
              </a>
            )}
          </h2>
          <div className="-mb-2">
            {album.songs.map((song) => {
              const currentIndex = counter;
              const isActive = song.audio && playIndex === currentIndex && isPlaying;
              if (song.audio) {
                playableSongs.push(song);
                counter++;
              }

              const renderLine = () => (
                <div className="flex">
                  <div
                    className={(isActive ? 'text-scheme-primary' : 'text-scheme-third') + ' mr-4 shrink-0 self-center'}
                    style={{ width: SVG_SONG_SIZE }}
                  >
                    {isActive ? (
                      <Image src={SvgSongPlaying} width={SVG_SONG_SIZE} height={SVG_SONG_SIZE} title="Playing" />
                    ) : (
                      <Image src={SvgSongPlay} width={SVG_SONG_SIZE} height={SVG_SONG_SIZE} title="Play" />
                    )}
                  </div>
                  <div className="min-w-0 grow truncate">
                    <div>{song.title}</div>
                    {song.featuring && (
                      <div className="text-scheme-third text-xs">
                        <span className="italic">w.</span> {song.featuring}
                      </div>
                    )}
                  </div>
                  <div className="text-scheme-third ml-4 shrink-0">{song.duration || '--:--'}</div>
                </div>
              );

              return (
                <div className="border-scheme -mx-2 border-t text-sm" key={song.title}>
                  {song.audio ? (
                    <button
                      className="w-full cursor-pointer p-2 text-left"
                      type="button"
                      onClick={(event) => {
                        if (event.detail > 0) event.currentTarget.blur();
                        handleSongClick(currentIndex);
                      }}
                    >
                      {renderLine()}
                    </button>
                  ) : (
                    <div className="text-scheme-third cursor-not-allowed p-2">{renderLine()}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <Audio
        songs={playableSongs}
        index={playIndex}
        isPlaying={isPlaying}
        setIndex={setPlayIndex}
        setIsPlaying={setIsPlaying}
      />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      albums: SONG_ALBUMS,
    },
    revalidate: STATIC_PROPS_REVALIDATE,
  };
}
