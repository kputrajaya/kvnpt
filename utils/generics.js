import { IMAGEKIT_ENDPOINT } from './constants';

export const buildImageSrc = (src, width, height, dynamicRatio = false) => {
  let newSrc = src;
  if (newSrc.startsWith('http') && !newSrc.startsWith(IMAGEKIT_ENDPOINT)) {
    newSrc = IMAGEKIT_ENDPOINT + newSrc;
  }
  newSrc += `?tr=w-${width * 1.5},h-${height * 1.5}`;
  if (dynamicRatio) {
    newSrc += ',c-at_max';
  }
  return newSrc;
};
