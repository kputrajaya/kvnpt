import Head from 'next/head'
import ReactMarkdown from 'react-markdown'

import { getResume } from '../utils/storyblok'
import BackButton from '../components/back_button'
import Image from '../components/image'

export default function Resume({ resume }) {
  const renderExperience = (block, index) => {
    if (block.component === 'link') {
      return (
        <li className="text-gray-500 text-sm" key={index}>
          <a className="mt-6 text-base font-semibold text-black inline-block print:no-underline" href={block.link.url}>{block.caption}</a>
        </li>
      )
    } else {
      return (
        <div className="mt-3 text-sm" key={index}>
          <h4 className="mb-1 font-semibold text-black">{block.position} &nbsp;&middot;&nbsp; {block.start} &ndash; {block.end}</h4>
          <div className="text-gray-500"><ReactMarkdown children={block.summary} /></div>
        </div>
      )
    }
  }
  const renderSkill = (block, index) => {
    return (
      <li className="mt-2 mr-2 px-3 py-2 text-sm bg-gray-200 rounded inline-block print:border print:border-black" data-synonyms={block.synonyms} key={index}>
        {block.display}
      </li>
    )
  }

  return (
    <>
      <Head>
        <title>Resume - Kevin Putrajaya</title>
      </Head>

      <BackButton href="/" />
      <Image src={resume.photo.url} width={125} height={125} className="mb-4 rounded-full" />
      <h1 className="mb-1 text-2xl font-semibold">{resume.name}</h1>
      <h3 className="mb-6 text-sm text-gray-500">{resume.position} &nbsp;&middot;&nbsp; {resume.location}</h3>

      <div className="text-sm"><ReactMarkdown children={resume.summary} /></div>

      <h3 className="mt-12 text-lg font-semibold">Experience</h3>
      <ul className="list-disc">
        {resume.experience.map(renderExperience)}
      </ul>

      <h3 className="mt-12 text-lg font-semibold">Skills</h3>
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
