import { getDateRange, getDatesBetween } from "./timeline.utils";

export function useTimelineDates(items) {
  const { start: minDate, end: maxDate } = getDateRange(items);
  const minYearDate = new Date(minDate.getFullYear(), 0, 1);
  const maxYearDate = new Date(maxDate.getFullYear(), 11, 31);

  const dates = getDatesBetween(minYearDate, maxYearDate);

  const totalDays = dates.length;

  return {
    dates,
    maxYearDate,
    minYearDate,
    totalDays,
  };
}
