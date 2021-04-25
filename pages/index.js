import Head from 'next/head'
import ReactMarkdown from 'react-markdown'

import { getIntro, getContact } from '../utils/storyblok'
import Image from '../components/image'

export default function Home({ avatar, content, contact }) {
  return (
    <>
      <Head>
        <title>Kevin Putrajaya</title>
      </Head>

      <div className="h-screen -my-8 py-8 flex items-center">
        <div className="md:flex items-start">
          <Image src={avatar} title="Kevin Putrajaya" width={125} height={125} className="rounded-full md:mt-1 flex-shrink-0" />
          <div className="mt-8 md:mt-0 md:ml-8">
            <div className="mb-8">
              <ReactMarkdown children={content} />
            </div>
            {
              contact.map((contact, index) => (
                <a className="mr-4 inline-block" href={contact.link} target="_blank" key={index}>
                  <Image src={contact.image} title={contact.title} width={25} height={25} />
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
  const [resIntro, resContact] = await Promise.all([getIntro(), getContact()])

  const [{ image: { url: avatar } }, { body: content }] = resIntro.story.content.body
  const contact = resContact.story.content.body.map((contact) => ({
    image: contact.image.url,
    title: contact.caption,
    link: contact.link.url
  }))

  return {
    props: {
      avatar,
      content,
      contact
    },
  }
}
