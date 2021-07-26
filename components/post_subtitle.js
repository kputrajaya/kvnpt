import { SVG_POST_SIZE } from '../utils/constants';
import { formatDate } from '../utils/dates';
import Image from './image';
import SvgDate from '../public/images/post-date.svg';
import SvgTag from '../public/images/post-tag.svg';

export default function PostSubtitle({ date, tags }) {
  return (
    <>
      <Image
        src={SvgDate}
        width={SVG_POST_SIZE}
        height={SVG_POST_SIZE}
        className="mr-1 inline-block relative -top-0.25"
      />
      {formatDate(date)}
      {tags?.length > 0 && (
        <>
          &nbsp;&nbsp;&middot;&nbsp;&nbsp;
          <Image
            src={SvgTag}
            width={SVG_POST_SIZE}
            height={SVG_POST_SIZE}
            className="mr-1 inline-block relative -top-0.25"
          />
          {tags.sort().join(', ')}
        </>
      )}
    </>
  );
}
