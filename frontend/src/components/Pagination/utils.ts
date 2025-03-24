export const TRIPLE_DOT_SYMBOL = '...';

export const renderPagination = (
  current: number,
  last: number,
  delta: number
) => {
  const left = current - delta;
  const right = current + delta + 1;
  const range = [];
  const rangeWithDots: (typeof TRIPLE_DOT_SYMBOL | number)[] = [];
  let l;

  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (l !== undefined) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push(TRIPLE_DOT_SYMBOL);
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
};
