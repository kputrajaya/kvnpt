import {useState} from 'react'
import Head from 'next/head'

import {SITE_TITLE, STATIC_PROPS_REVALIDATE} from '../../utils/constants'
import {getSongAlbums} from '../../utils/storyblok'
import Audio from '../../components/audio'
import BackButton from '../../components/back_button'

export default function Songs({albums}) {
  const [playIndex, setPlayIndex] = useState(-1)
  const allSongs = []
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
                    if (song.audio.url) {
                      allSongs.push(song)
                      counter++
                    }

                    const renderLine = () => (
                      <div className="flex">
                        <div className="flex-grow">
                          <span className={song.audio.url && playIndex === songIndex ? 'font-semibold' : ''}>
                            {song.title}
                          </span>
                          {
                            song.featuring &&
                            <div className="text-xs text-scheme-third">
                              <span className="italic">w.</span> {song.featuring}
                            </div>
                          }
                        </div>
                        <div className="text-scheme-third">
                          {song.duration || '--:--'}
                        </div>
                      </div>
                    )

                    return (
                      <div className="text-sm text-scheme-primary border-t border-scheme" key={index}>
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

      <Audio songs={allSongs} index={playIndex} setIndex={setPlayIndex} />
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
