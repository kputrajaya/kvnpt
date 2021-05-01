import { getLinkPreview as getLinkPreviewLib } from 'link-preview-js'

export const getLinkPreview = async (url) => {
  try {
    const preview = await getLinkPreviewLib(url)
    return {
      url: preview.url || null,
      title: preview.title || preview.siteName || null,
      description: preview.description || null,
      image: (preview.images || []).find(_ => true) || (preview.favicons || []).filter((icon) => icon.toLowerCase().endsWith('.png')).find(_ => true)
    }
  } catch (e) {
    return null
  }
}
