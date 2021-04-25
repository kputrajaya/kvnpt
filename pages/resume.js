import Head from 'next/head'
import ReactMarkdown from 'react-markdown'

import { getResume } from '../utils/storyblok'
import BackButton from '../components/back_button'

export default function Resume({ resume }) {
  const renderExperience = (block) => {
    if (block.component === 'link') {
      return (
        <li className="text-gray-500 text-sm">
          <a className="mt-6 text-md font-bold text-black block" href={block.link.url}>{block.caption}</a>
        </li>
      )
    } else {
      return (
        <div className="mt-4">
          <h4 className="mb-1 text-sm text-gray-500">{block.position} &middot; {block.start}&ndash;{block.end}</h4>
          <div>{block.summary}</div>
        </div>
      )
    }
  }
  const renderSkill = (block) => {
    return <li className="mt-2 mr-2 px-3 py-2 text-sm bg-gray-200 rounded inline-block" data-synonyms={block.synonyms}>{block.display}</li>
  }

  return (
    <>
      <Head>
        <title>Resume - Kevin Putrajaya</title>
      </Head>

      <BackButton href="/" />
      <h1 className="mb-1 text-2xl font-bold">{resume.name}</h1>
      <h3 className="mb-8 text-sm text-gray-500">{resume.position} &middot; {resume.location}</h3>

      <div><ReactMarkdown children={resume.summary} /></div>

      <h3 className="mt-8 text-lg font-bold">Experience</h3>
      <ul className="list-disc">
        {resume.experience.map(renderExperience)}
      </ul>

      <h3 className="mt-8 text-lg font-bold">Skills</h3>
      <ul className="mt-4">
        {resume.skills.map(renderSkill)}
      </ul>
    </>
  )
}

export async function getStaticProps() {
  const resResume = await getResume()

  return {
    props: {
      resume: resResume.story.content
    },
  }
}
