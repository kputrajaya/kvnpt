import { getLinkPreview as getLinkPreviewInner } from 'link-preview-js';

const getYoutubePreview = async (url) => {
  const match = url.match(/^(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com\/watch\?(?:.*&)?v=|youtu\.be\/)([\w-]{11})/);
  if (!match) return null;

  const id = match[1];
  // YouTube strips OG tags for datacenter IPs, so ask oEmbed instead of scraping.
  const endpoint = `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}&format=json`;

  try {
    const response = await fetch(endpoint, { signal: AbortSignal.timeout(10000) });
    if (!response.ok) return null;

    const data = await response.json();
    return {
      url,
      title: data.title || null,
      description: data.author_name ? `by ${data.author_name}` : null,
      image: `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
    };
  } catch (e) {
    return null;
  }
};

export const getLinkPreview = async (url) => {
  const youtube = await getYoutubePreview(url);
  if (youtube) return youtube;

  try {
    const preview = await getLinkPreviewInner(url);
    const result = {
      url: preview.url || null,
      title: null,
      description: null,
      image: (preview.favicons || []).find((icon) => icon.toLowerCase().endsWith('.png')) || null,
    };
    if ('title' in preview) {
      result.title = preview.title || preview.siteName || null;
      result.description = preview.description || null;
      result.image = (preview.images || []).find(() => true) || result.image;
    }
    return result;
  } catch (e) {
    return null;
  }
};
