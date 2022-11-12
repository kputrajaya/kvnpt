import Head from 'next/head';

import { INTRO_AVATAR_SIZE, INTRO_CONTACT_SIZE, SITE_TITLE, STATIC_PROPS_REVALIDATE } from '../utils/constants';
import { getHome } from '../utils/storyblok';
import Image from '../components/image';
import Markdown from '../components/markdown';
import SvgEmail from '../public/images/contact-email.svg';
import SvgGitHub from '../public/images/contact-github.svg';
import SvgLinkedIn from '../public/images/contact-linkedin.svg';

export default function Home({ photo, introduction, contacts }) {
  const contactSvgMap = {
    Email: SvgEmail,
    GitHub: SvgGitHub,
    LinkedIn: SvgLinkedIn,
  };

  return (
    <>
      <Head>
        <title>{SITE_TITLE}</title>
      </Head>

      <div className="-my-8 flex h-screen items-center py-8">
        <div className="md:flex md:items-start">
          <Image
            className="rounded-full md:mt-1 md:shrink-0"
            src={photo.url}
            width={INTRO_AVATAR_SIZE}
            height={INTRO_AVATAR_SIZE}
            alt={SITE_TITLE}
            title=""
          />
          <div className="mt-8 md:mt-0 md:ml-8">
            <div className="mb-8">
              <Markdown text={introduction} />
            </div>
            <div style={{ height: INTRO_CONTACT_SIZE }}>
              {contacts.map((contact, index) => (
                <a className="mr-4 inline-block" href={contact.link.url} target="_blank" rel="noreferrer" key={index}>
                  <Image
                    className="text-scheme-primary fill-current"
                    src={contactSvgMap[contact.caption]}
                    width={INTRO_CONTACT_SIZE}
                    height={INTRO_CONTACT_SIZE}
                    alt={contact.caption}
                    title={contact.caption}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const resHome = await getHome();
  const { photo, introduction, contacts } = resHome.story.content;

  return {
    props: { photo, introduction, contacts },
    revalidate: STATIC_PROPS_REVALIDATE,
  };
}
