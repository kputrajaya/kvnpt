import { getLinkPreview as getLinkPreviewLib } from 'link-preview-js'

export const getLinkPreview = async (url) => {
  try {
    const preview = await getLinkPreviewLib(url)
    console.log(preview)
    return {
      url: preview.url || null,
      title: preview.title || preview.siteName || null,
      description: preview.description || null,
      image: (preview.favicons || []).filter((icon) => icon.toLowerCase().endsWith('.png')).find(_ => true) || (preview.images || []).find(_ => true)
    }
  } catch (e) {
    return null
  }
}
