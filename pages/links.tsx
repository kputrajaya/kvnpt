import { SITE_NAME, SITE_URL, STATIC_PROPS_REVALIDATE } from '../utils/constants';
import BackButton from '../components/back_button';
import Seo from '../components/seo';

export default function Links({ links }) {
  return (
    <>
      <Seo
        title="Links"
        description={`Short links and profiles for ${SITE_NAME}.`}
        path="/links"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `Links — ${SITE_NAME}`,
          url: `${SITE_URL}/links`,
        }}
      />

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
  const links = vercelConfig.redirects
    .filter((rule) => !rule.has && rule.source.startsWith('/('))
    .map((rule) => {
      const [short, name] = rule.source.replace(/[/()]/g, '').split('|');
      return { short, name, url: rule.destination };
    });

  return {
    props: { links },
    revalidate: STATIC_PROPS_REVALIDATE,
  };
}
