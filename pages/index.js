import Head from 'next/head'
import ReactMarkdown from 'react-markdown'

import { getIntro, getLinks } from '../utils/storyblok'
import Image from '../components/image'

export default function Home({ avatar, content, links }) {
  return (
    <>
      <Head>
        <title>Kevin Putrajaya</title>
      </Head>

      <div className="h-screen py-8 flex items-center">
        <div className="md:flex items-start">
          <Image src={avatar} width={125} height={125} className="rounded-full md:mt-1 flex-shrink-0" title="Kevin Putrajaya" />
          <div className="mt-8 md:mt-0 md:ml-8">
            <div className="mb-8">
              <ReactMarkdown children={content} />
            </div>
            {
              links.map((link, index) => (
                <a className="mr-4 inline-block" href={link.link} target="_blank" key={index}>
                  <Image src={link.image} width={25} height={25} title={link.title} />
                </a>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const [resIntro, resLinks] = await Promise.all([getIntro(), getLinks()])

  const [{ image: { url: avatar } }, { body: content }] = resIntro.story.content.body
  const links = resLinks.story.content.body.map((link) => ({
    image: link.image.url,
    title: link.caption,
    link: link.link.url
  }))

  return {
    props: {
      avatar,
      content,
      links
    },
  }
}
