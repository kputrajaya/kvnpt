import { format, parseISO } from 'date-fns'
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

export const formatDate = (date) => {
  const dateWithoutZ = date.substr(-1) === 'Z' ? date.substr(0, date.length - 1) : date
  return format(parseISO(dateWithoutZ), 'd LLL yyyy')
}
