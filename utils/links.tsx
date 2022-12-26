import { getLinkPreview as getLinkPreviewInner } from 'link-preview-js';

export const getLinkPreview = async (url) => {
  try {
    const preview = await getLinkPreviewInner(url);
    const result = {
      url: preview.url || null,
      title: null,
      description: null,
      image: (preview.favicons || []).filter((icon) => icon.toLowerCase().endsWith('.png')).find((_) => true) || null,
    };
    if ('title' in preview) {
      result.title = preview.title || preview.siteName || null;
      result.description = preview.description || null;
      result.image = (preview.images || []).find((_) => true) || result.image;
    }
    return result;
  } catch (e) {
    return null;
  }
};
