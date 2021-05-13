import {useState} from 'react'
import Head from 'next/head'

import {SITE_TITLE, STATIC_PROPS_REVALIDATE} from '../../utils/constants'
import {getSongAlbums} from '../../utils/storyblok'
import BackButton from '../../components/back_button'
import Audio from '../../components/audio'

export default function Songs({albums}) {
  const [playIndex, setPlayIndex] = useState(-1)
  const allSongs = []
  let currentIndex = -1

  return (
    <>
      <Head>
        <title>Songs - {SITE_TITLE}</title>
      </Head>

      <BackButton href="/" />
      <h1 className="mb-8 text-2xl font-semibold">Songs (WIP)</h1>

      {
        albums.map((album, index) => {
          const albumElm = (
            <div className="kvn-card mb-8" key={index}>
              <h2 className="mb-4 font-semibold">{album.name}</h2>
              <div className="-mb-2">
                {
                  album.content.songs.map((song, index) => {
                    if (song.audio.url) {
                      allSongs.push(song)
                      currentIndex++
                    }
                    return (
                      <div className="border-t border-scheme" key={index}>
                        {
                          song.audio.url ?
                            <div
                              className={
                                'py-2 text-scheme-primary cursor-pointer ' +
                                (playIndex === currentIndex ? 'font-semibold' : '')
                              }
                              onClick={() => setPlayIndex(currentIndex)}
                            >
                              {song.title}
                            </div> :
                            <div className="py-2 text-scheme-third cursor-not-allowed">
                              {song.title}
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
