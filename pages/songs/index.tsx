import { useState } from 'react';
import Head from 'next/head';

import { SITE_TITLE, STATIC_PROPS_REVALIDATE, SVG_INFO_SIZE, SVG_SONG_SIZE } from '../../utils/constants';
import { getSongAlbums } from '../../utils/storyblok';
import Audio from '../../components/audio';
import BackButton from '../../components/back_button';
import Image from '../../components/image';
import SvgSongInfo from '../../public/images/song-info.svg';
import SvgSongPlay from '../../public/images/song-play.svg';
import SvgSongPlaying from '../../public/images/song-playing.svg';

export default function Songs({ albums }) {
  const [playIndex, setPlayIndex] = useState(-1);
  const playableSongs = [];
  let counter = 0;

  return (
    <>
      <Head>
        <title>Songs - {SITE_TITLE}</title>
      </Head>

      <BackButton href="/" />
      <h1 className="mb-8 text-2xl font-semibold">Songs</h1>

      {albums.map((album, albumIndex) => (
        <div className="kvn-card mb-8" key={albumIndex}>
          <h2 className="mb-4 font-semibold">
            {album.name}
            {album.content?.link?.url && (
              <a
                className="-my-px inline-block px-2 py-1 align-middle"
                href={album.content.link.url}
                target="_blank"
                rel="noreferrer"
              >
                <Image src={SvgSongInfo} width={SVG_INFO_SIZE} height={SVG_INFO_SIZE} alt="Info" title="Info" />
              </a>
            )}
          </h2>
          <div className="-mb-2">
            {album.content.songs.map((song, songIndex) => {
              const currentIndex = counter;
              const playing = song.audio.url && playIndex === currentIndex;
              if (song.audio.url) {
                playableSongs.push(song);
                counter++;
              }

              const renderLine = () => (
                <div className="flex">
                  <div
                    className="text-scheme-primary mr-4 shrink-0 self-center fill-current"
                    style={{ width: SVG_SONG_SIZE }}
                  >
                    {playing ? (
                      <Image src={SvgSongPlaying} width={SVG_SONG_SIZE} height={SVG_SONG_SIZE} alt="Playing" title="" />
                    ) : (
                      <Image src={SvgSongPlay} width={SVG_SONG_SIZE} height={SVG_SONG_SIZE} alt="Play" title="" />
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
                <div className="border-scheme border-t text-sm" key={songIndex}>
                  {song.audio.url ? (
                    <div className="cursor-pointer py-2" onClick={() => setPlayIndex(currentIndex)}>
                      {renderLine()}
                    </div>
                  ) : (
                    <div className="text-scheme-third cursor-not-allowed py-2">{renderLine()}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <Audio songs={playableSongs} index={playIndex} setIndex={setPlayIndex} />
    </>
  );
}

export async function getStaticProps() {
  const resSongAlbums = await getSongAlbums();

  return {
    props: {
      albums: resSongAlbums.stories,
    },
    revalidate: STATIC_PROPS_REVALIDATE,
  };
}
