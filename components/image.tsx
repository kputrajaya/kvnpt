import NextImage from 'next/image';

import { buildImageSrc } from '../utils/generics';

export default function Image({ src, title, width, height, dynamicRatio = false, ...props }) {
  // Handle SVG
  if (typeof src === 'function') {
    const SvgComponent = src;
    return (
      <div className="inline-block" title={title} {...props}>
        <SvgComponent width={width} height={height} />
      </div>
    );
  }

  const newSrc = buildImageSrc(src, width, height, dynamicRatio);
  const style = dynamicRatio
    ? {
        width: 'auto',
        maxWidth: '100%',
        height: 'auto',
        maxHeight: height,
      }
    : {
        width,
        height: 'auto',
      };
  return <NextImage src={newSrc} alt={title} title={title} width={width} height={height} style={style} {...props} />;
}
