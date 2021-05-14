import Head from 'next/head'

import {RESUME_AVATAR_SIZE, SITE_TITLE, STATIC_PROPS_REVALIDATE} from '../utils/constants'
import {getResume} from '../utils/storyblok'
import BackButton from '../components/back_button'
import Image from '../components/image'
import Markdown from '../components/markdown'

export default function Resume({resume}) {
  const renderExperience = () => {
    // Group positions based on company
    const companies = []
    let currentCompany = null
    resume.experience.forEach((block) => {
      if (block.component === 'link') {
        if (currentCompany) {
          companies.push(currentCompany)
        }
        currentCompany = {
          company: block,
          positions: [],
        }
      } else if (currentCompany) {
        currentCompany.positions.push(block)
      }
    })
    if (currentCompany?.positions?.length) {
      companies.push(currentCompany)
    }

    return (
      companies.map((company, index) => (
        <div className="kvn-card mt-4" key={index}>
          <div className="-mb-4 font-semibold">
            {
              company.company.link.url ?
                <a className="inline-block" href={company.company.link.url} target="_blank" rel="noreferrer">
                  {company.company.caption}
                </a> :
                <div>
                  {company.company.caption}
                </div>
            }
          </div>
          {
            company.positions.map((position, index) => (
              <div className="mt-7 -mb-4 text-sm" key={index}>
                <h4 className="mb-1 font-semibold text-scheme-second">
                  {position.position} &nbsp;&middot;&nbsp; {position.start} &ndash; {position.end}
                </h4>
                <div className="text-scheme-third"><Markdown text={position.summary} /></div>
              </div>
            ))
          }
        </div>
      ))
    )
  }

  return (
    <>
      <Head>
        <title>Resume - {SITE_TITLE}</title>
      </Head>

      <BackButton href="/" />
      <Image
        src={resume.photo.url}
        width={RESUME_AVATAR_SIZE}
        height={RESUME_AVATAR_SIZE}
        className="mb-4 rounded-full"
      />
      <h1 className="mb-2 text-2xl font-semibold">{resume.name}</h1>
      <h3 className="mb-6 text-sm text-scheme-third">{resume.position} &nbsp;&middot;&nbsp; {resume.location}</h3>

      <div className="text-sm"><Markdown text={resume.summary} /></div>

      <h3 className="mt-12 text-lg font-semibold">Experience</h3>
      <ul className="list-disc">
        {renderExperience()}
      </ul>

      <h3 className="mt-12 text-lg font-semibold">Skills</h3>
      <ul className="mt-4 leading-0">
        {
          resume.skills.map((block, index) => (
            <li className="kvn-card kvn-card-small mt-2 mr-2 text-sm inline-block" key={index}>
              <span className={block.highlight ? 'font-semibold' : ''}>{block.name}</span>
            </li>
          ))
        }
      </ul>
    </>
  )
}

export async function getStaticProps() {
  const resResume = await getResume()

  return {
    props: {
      resume: resResume.story.content,
    },
    revalidate: STATIC_PROPS_REVALIDATE,
  }
}
