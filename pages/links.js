import Head from 'next/head';
import Link from 'next/link';

import { SITE_TITLE, STATIC_PROPS_REVALIDATE } from '../utils/constants';
import BackButton from '../components/back_button';

export default function Links({ links }) {
  return (
    <>
      <Head>
        <title>Links - {SITE_TITLE}</title>
      </Head>

      <BackButton href="/" />
      <h1 className="mb-8 text-2xl font-semibold">Links</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {links.map((link, index) => (
          <Link href={`/${link.short}`} key={index}>
            <a className="kvn-card block">
              <h2 className="mb-1 font-semibold">/{link.short}</h2>
              <h3 className="text-sm text-scheme-third">{link.name}</h3>
            </a>
          </Link>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const vercelConfig = require('../vercel.json');
  const links = vercelConfig.redirects.map((rule) => {
    const [short, name] = rule.source.replace(/[\/\(\)]/g, '').split('|');
    return { short, name, url: rule.destination };
  });

  return {
    props: { links },
    revalidate: STATIC_PROPS_REVALIDATE,
  };
}
