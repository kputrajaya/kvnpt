import {useState} from 'react'
import Head from 'next/head'

import {SITE_TITLE, STATIC_PROPS_REVALIDATE, SVG_SONG_SIZE} from '../../utils/constants'
import {getSongAlbums} from '../../utils/storyblok'
import Audio from '../../components/audio'
import BackButton from '../../components/back_button'
import Image from '../../components/image'
import SvgSongPlay from '../../public/images/song-play.svg'
import SvgSongPlaying from '../../public/images/song-playing.svg'

export default function Songs({albums}) {
  const [playIndex, setPlayIndex] = useState(-1)
  const playableSongs = []
  let counter = 0

  return (
    <>
      <Head>
        <title>Songs - {SITE_TITLE}</title>
      </Head>

      <BackButton href="/" />
      <h1 className="mb-8 text-2xl font-semibold">Songs</h1>

      {
        albums.map((album, index) => {
          const albumElm = (
            <div className="kvn-card mb-8" key={index}>
              <h2 className="mb-4 font-semibold">{album.name}</h2>
              <div className="-mb-2">
                {
                  album.content.songs.map((song, index) => {
                    const songIndex = counter
                    const playing = song.audio.url && playIndex === songIndex
                    if (song.audio.url) {
                      playableSongs.push(song)
                      counter++
                    }

                    const renderLine = () => (
                      <div className="flex">
                        <div
                          className="mr-4 text-scheme-primary fill-current flex-shrink-0 self-center"
                          style={{width: SVG_SONG_SIZE}}
                        >
                          {
                            playing ?
                              <Image src={SvgSongPlaying} width={SVG_SONG_SIZE} height={SVG_SONG_SIZE} /> :
                              <Image src={SvgSongPlay} width={SVG_SONG_SIZE} height={SVG_SONG_SIZE} />
                          }
                        </div>
                        <div className="min-w-0 truncate flex-grow">
                          <div>
                            {song.title}
                          </div>
                          {
                            song.featuring &&
                            <div className="text-xs text-scheme-third">
                              <span className="italic">w.</span> {song.featuring}
                            </div>
                          }
                        </div>
                        <div className="ml-4 text-scheme-third flex-shrink-0">
                          {song.duration || '--:--'}
                        </div>
                      </div>
                    )

                    return (
                      <div className="text-sm border-t border-scheme" key={index}>
                        {
                          song.audio.url ?
                            <div className="py-2 cursor-pointer" onClick={() => setPlayIndex(songIndex)}>
                              {renderLine()}
                            </div> :
                            <div className="py-2 text-scheme-third cursor-not-allowed">
                              {renderLine()}
                            </div>
                        }
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )

          return albumElm
        })
      }

      <Audio songs={playableSongs} index={playIndex} setIndex={setPlayIndex} />
    </>
  )
}

export async function getStaticProps({params}) {
  const resSongAlbums = await getSongAlbums()

  return {
    props: {
      albums: resSongAlbums.stories,
    },
    revalidate: STATIC_PROPS_REVALIDATE,
  }
}
