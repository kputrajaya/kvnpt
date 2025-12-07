import { SVG_POST_SIZE } from '../utils/constants';
import { formatDate } from '../utils/dates';
import Image from './image';
import SvgDate from '../public/images/post-date.svg';
import SvgTag from '../public/images/post-tag.svg';

export default function PostSubtitle({ date, tags = [] }) {
  return (
    <div className="flex align-center items-center">
      <Image
        src={SvgDate}
        width={SVG_POST_SIZE}
        height={SVG_POST_SIZE}
        className="relative mr-1 inline-block"
        title="Date"
      />
      {formatDate(date)}
      {tags.length > 0 && (
        <>
          &nbsp;&nbsp;&middot;&nbsp;&nbsp;
          <Image
            src={SvgTag}
            width={SVG_POST_SIZE}
            height={SVG_POST_SIZE}
            className="relative mr-1 inline-block"
            title="Tags"
          />
          {[...tags].sort((a, b) => a.localeCompare(b)).join(', ')}
        </>
      )}
    </div>
  );
}
