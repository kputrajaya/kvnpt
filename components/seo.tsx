import Head from 'next/head';
import { useRouter } from 'next/router';

import {
  SITE_DESCRIPTION,
  SITE_IMAGE,
  SITE_NAME,
  SITE_TITLE,
  SITE_TWITTER_USER,
  SITE_URL,
} from '../utils/constants';

type SeoProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const getCanonical = (path?: string, asPath?: string) => {
  const rawPath = (path || asPath || '/').split('?')[0].split('#')[0];
  const normalizedPath = rawPath === '/' ? '/' : rawPath.replace(/\/+$/, '');
  return `${SITE_URL}${normalizedPath}`;
};

const getImage = (image?: string) => {
  if (!image) return SITE_IMAGE;
  return /^https?:\/\//i.test(image) ? image : `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`;
};

export default function Seo({
  title = SITE_TITLE,
  description = SITE_DESCRIPTION,
  path,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  tags = [],
  noindex = false,
  jsonLd,
}: SeoProps) {
  const router = useRouter();
  const canonical = getCanonical(path, router.asPath);
  const fullTitle = title === SITE_NAME ? title : `${title} — ${SITE_NAME}`;
  const fullImage = getImage(image);
  const robots = noindex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  const articleTags = Array.isArray(tags) ? tags : [];

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      {!noindex && <link rel="canonical" href={canonical} />}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={fullImage} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {articleTags.map((tag) => (
        <meta property="article:tag" content={tag} key={tag} />
      ))}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={SITE_TWITTER_USER} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      <link rel="icon" href="/favicon.ico" sizes="any" />

      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
          }}
        />
      ))}
    </Head>
  );
}
