import {IMAGEKIT_ENDPOINT} from './constants'

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
