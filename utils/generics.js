import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import {getLinkPreview as getLinkPreviewInner} from 'link-preview-js'

import {IMAGEKIT_ENDPOINT} from './constants'

export const formatDate = (date) => {
  const dateWithoutZ = date.substr(-1) === 'Z' ?
    date.substr(0, date.length - 1) :
    date
  return format(parseISO(dateWithoutZ), 'd LLL yyyy')
}

export const buildImageSrc = (src, width, height, dynamicRatio=false) => {
  let newSrc = src
  if (newSrc.startsWith('http') && !newSrc.startsWith(IMAGEKIT_ENDPOINT)) {
    newSrc = IMAGEKIT_ENDPOINT + newSrc
  }
  newSrc += `?tr=w-${width * 2},h-${height * 2}`
  if (dynamicRatio) {
    newSrc += ',c-at_max'
  }
  return newSrc
}

export const getLinkPreview = async (url) => {
  try {
    const preview = await getLinkPreviewInner(url)
    return {
      url: preview.url || null,
      title: preview.title || preview.siteName || null,
      description: preview.description || null,
      image: (
        (preview.images || []).find((_) => true) ||
        (preview.favicons || []).filter((icon) => icon.toLowerCase().endsWith('.png')).find((_) => true) ||
        null
      ),
    }
  } catch (e) {
    return null
  }
}
