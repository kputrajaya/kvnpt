import Link from 'next/link';

import {
  INTRO_AVATAR_SIZE,
  INTRO_CONTACT_SIZE,
  SITE_DESCRIPTION,
  SITE_EMPLOYER,
  SITE_IMAGE,
  SITE_JOB_TITLE,
  SITE_NAME,
  SITE_SAME_AS,
  SITE_TITLE,
  SITE_URL,
  STATIC_PROPS_REVALIDATE,
} from '../utils/constants';
import { getHome } from '../utils/storyblok';
import Image from '../components/image';
import Markdown from '../components/markdown';
import Seo from '../components/seo';
import SvgEmail from '../public/images/contact-email.svg';
import SvgGitHub from '../public/images/contact-github.svg';
import SvgLinkedIn from '../public/images/contact-linkedin.svg';

export default function Home({ photo, introduction, contacts }) {
  const contactSvgMap = {
    Email: SvgEmail,
    GitHub: SvgGitHub,
    LinkedIn: SvgLinkedIn,
  };

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL,
      image: SITE_IMAGE,
      jobTitle: SITE_JOB_TITLE,
      worksFor: { '@type': 'Organization', name: SITE_EMPLOYER },
      sameAs: SITE_SAME_AS,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      author: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
    },
  ];

  return (
    <>
      <Seo title={SITE_TITLE} path="/" jsonLd={structuredData} />

      <div className="-my-8 flex h-screen items-center py-8">
        <div className="md:flex md:items-start">
          <Image
            className="rounded-full md:mt-1 md:shrink-0"
            src={photo.url}
            width={INTRO_AVATAR_SIZE}
            height={INTRO_AVATAR_SIZE}
            title={SITE_TITLE}
            priority
          />
          <div className="mt-8 md:mt-0 md:ml-8">
            <div className="mb-8">
              <Markdown text={introduction} />
            </div>
            <div style={{ height: INTRO_CONTACT_SIZE }}>
              {contacts.map((contact) => (
                <a
                  className="mr-4 inline-block"
                  href={contact.link.url}
                  target="_blank"
                  rel="noreferrer"
                  key={contact.link.url}
                >
                  <Image
                    className="text-scheme-primary"
                    src={contactSvgMap[contact.caption]}
                    width={INTRO_CONTACT_SIZE}
                    height={INTRO_CONTACT_SIZE}
                    alt={contact.caption}
                    title={contact.caption}
                  />
                </a>
              ))}
            </div>
            <div className="mt-8 text-sm">
              <Link className="underline" href="/projects">
                View my projects &rarr;
              </Link>
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
