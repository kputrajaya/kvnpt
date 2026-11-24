import { SITE_NAME, SITE_URL } from './constants';

export const absoluteUrl = (path = '/') => {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

export const stripMarkdown = (text = '') =>
  text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_>`~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

export const truncate = (text = '', length = 155) => {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= length) return clean;
  return `${clean.slice(0, length - 1).replace(/[\s,.;:!?-]+$/, '')}…`;
};

export const getPostDescription = (post) => {
  const explicit = post?.content?.description || post?.content?.excerpt || post?.content?.summary;
  if (typeof explicit === 'string' && explicit.trim()) return truncate(stripMarkdown(explicit));

  const blocks = post?.content?.body || [];
  const paragraph = blocks.find((block) => block.component === 'paragraph' && typeof block.body === 'string');
  const quote = blocks.find((block) => block.component === 'blockquote' && typeof block.body === 'string');

  return truncate(stripMarkdown(paragraph?.body || quote?.body || `A post by ${SITE_NAME}.`));
};

export const getPostImage = (post) => {
  const blocks = post?.content?.body || [];
  const photo = blocks.find((block) => block.component === 'photo' && block.image?.url);
  return photo?.image?.url || null;
};

export const getPostDates = (post) => {
  const published = post?.first_published_at || post?.published_at || post?.created_at;
  const modified = post?.updated_at || published;
  return { published, modified };
};

export const getBreadcrumb = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});
