import { format, sub } from "date-fns";

const SEARCH_TIMESPAN_DAYS = 7;

/**
 * Expects a UTC Date object.
 * Subtracts `daysAgo` days, adjusts it for the user's timezone and returns a string in 'yyyy-mm-dd' format.
 */
export default function getTimeZoneAdjustedStartDate(date: Date) {
  const timeZoneOffsetMinutes = date.getTimezoneOffset();
  const startDate = sub(new Date(date), {
    minutes: timeZoneOffsetMinutes,
    days: SEARCH_TIMESPAN_DAYS
  });

  return format(startDate, "yyyy-MM-dd");
}

export const getApiUrl = (startDateString: string) =>
  `https://api.github.com/search/repositories?q=created:%3E${startDateString}&sort=stars&order=desc`;
