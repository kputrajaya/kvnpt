import { getLinkPreview as getLinkPreviewInner } from 'link-preview-js'

export const getLinkPreview = async (url) => {
  try {
    const preview = await getLinkPreviewInner(url)
    return {
      url: preview.url || null,
      title: preview.title || preview.siteName || null,
      description: preview.description || null,
      image: (
        (preview.images || []).find(_ => true) ||
        (preview.favicons || []).filter((icon) => icon.toLowerCase().endsWith('.png')).find(_ => true) ||
        null
      )
    }
  } catch (e) {
    return null
  }
}
