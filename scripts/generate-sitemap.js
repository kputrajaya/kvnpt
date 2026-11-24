const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://kvn.pt';
const STORYBLOK_TOKEN = process.env.STORYBLOK_TOKEN;
const OUTPUT = path.join(process.cwd(), 'public', 'sitemap.xml');
const PER_PAGE = 100;

const STATIC_PAGES = [
  { path: '/', priority: '1.0' },
  { path: '/blog/pages/1', priority: '0.8' },
  { path: '/resume', priority: '0.8' },
  { path: '/projects', priority: '0.8' },
  { path: '/photos', priority: '0.6' },
  { path: '/songs', priority: '0.6' },
  { path: '/links', priority: '0.3' },
];

const escapeXml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const toLastmod = (value) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
};

const fetchPosts = async () => {
  if (!STORYBLOK_TOKEN || STORYBLOK_TOKEN === 'Not initialized') {
    console.warn('[sitemap] STORYBLOK_TOKEN not set; using static pages only.');
    return [];
  }

  const posts = [];

  for (let page = 1; page <= 20; page += 1) {
    const url =
      `https://api.storyblok.com/v1/cdn/stories?token=${encodeURIComponent(STORYBLOK_TOKEN)}` +
      `&starts_with=posts&page=${page}&per_page=${PER_PAGE}&sort_by=position`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Storyblok returned ${response.status}`);
    }

    const data = await response.json();
    const stories = data.stories || [];
    posts.push(...stories);

    if (stories.length < PER_PAGE) break;
  }

  return posts;
};

const getPhotoAlbums = () => {
  try {
    return require('../data/photo-albums.json');
  } catch (error) {
    console.warn('[sitemap] Could not load photo albums:', error.message);
    return [];
  }
};

const buildUrl = ({ path: pagePath, lastmod, priority }) => {
  const lines = ['  <url>', `    <loc>${escapeXml(`${SITE_URL}${pagePath}`)}</loc>`];

  if (lastmod && toLastmod(lastmod)) {
    lines.push(`    <lastmod>${toLastmod(lastmod)}</lastmod>`);
  }
  if (priority) {
    lines.push(`    <priority>${priority}</priority>`);
  }

  lines.push('  </url>');
  return lines.join('\n');
};

const main = async () => {
  let posts = [];
  try {
    posts = await fetchPosts();
  } catch (error) {
    console.warn('[sitemap] Could not fetch posts:', error.message);
  }

  const pages = [...STATIC_PAGES];
  const pageCount = Math.max(1, Math.ceil(posts.length / 20));

  for (let page = 2; page <= pageCount; page += 1) {
    pages.push({ path: `/blog/pages/${page}`, priority: '0.5' });
  }

  posts.forEach((post) => {
    pages.push({
      path: `/blog/posts/${post.slug}`,
      lastmod: post.updated_at || post.first_published_at || post.published_at,
      priority: '0.7',
    });
  });

  getPhotoAlbums().forEach((album) => {
    pages.push({
      path: `/photos/${album.slug}`,
      lastmod: album.date,
      priority: '0.5',
    });
  });

  const seen = new Set();
  const uniquePages = pages.filter((page) => {
    if (seen.has(page.path)) return false;
    seen.add(page.path);
    return true;
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...uniquePages.map(buildUrl),
    '</urlset>',
    '',
  ].join('\n');

  fs.writeFileSync(OUTPUT, xml);
  console.log(`[sitemap] Wrote ${uniquePages.length} URLs to ${OUTPUT}`);
};

main().catch((error) => {
  console.error('[sitemap] Failed:', error);
  process.exitCode = 1;
});
