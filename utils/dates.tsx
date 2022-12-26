import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

export const formatDate = (date) => {
  const dateWithoutZ = date.substr(-1) === 'Z' ? date.substr(0, date.length - 1) : date;
  return format(parseISO(dateWithoutZ), 'd LLL yyyy');
};
