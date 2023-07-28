export function getArrayOfNumbers(start: number, end: number) {
  const arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
}

interface ISplitRangeArgs {
  start: number;
  end: number;
  current: number;
  maxCount: number;
}
interface ISplitRange {
  firstPart: number[];
  secondPart: number[];
  hasDelimiter: boolean;
}
export function splitRange({
  start,
  end,
  current,
  maxCount,
}: ISplitRangeArgs): ISplitRange {
  const hasDelimiter = end - start > maxCount + 1;

  if (!hasDelimiter) {
    return {
      firstPart: getArrayOfNumbers(start, end),
      secondPart: [],
      hasDelimiter,
    };
  }

  if (start - current <= maxCount && current < start + maxCount) {
    return {
      firstPart: getArrayOfNumbers(start, start + maxCount - 1),
      secondPart: [end],
      hasDelimiter,
    };
  }

  if (end - current <= maxCount && current > end - maxCount) {
    return {
      firstPart: [start],
      secondPart: getArrayOfNumbers(end - (maxCount - 1), end),
      hasDelimiter,
    };
  }

  return {
    firstPart: getArrayOfNumbers(current - maxCount + 2, current + 1),
    secondPart: [end],
    hasDelimiter,
  };
}
