import Head from 'next/head';

import { SITE_TITLE, STATIC_PROPS_REVALIDATE } from '../utils/constants';
import BackButton from '../components/back_button';

export default function Links({ links }) {
  return (
    <>
      <Head>
        <title>{`Links - ${SITE_TITLE}`}</title>
      </Head>

      <BackButton href="/" />
      <h1 className="mb-8 text-2xl font-semibold">Links</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {links.map((link) => (
          <a className="kvn-card block" href={`/${link.short}`} target="_blank" rel="noreferrer" key={link.name}>
            <h2 className="mb-1 font-semibold">/{link.short}</h2>
            <h3 className="text-scheme-third text-sm">{link.name}</h3>
          </a>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const vercelConfig = require('../vercel.json');
  const links = vercelConfig.redirects.map((rule) => {
    const [short, name] = rule.source.replace(/[/()]/g, '').split('|');
    return { short, name, url: rule.destination };
  });

  return {
    props: { links },
    revalidate: STATIC_PROPS_REVALIDATE,
  };
}
