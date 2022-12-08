import { format, sub } from "date-fns";

/**
 * Expects a UTC Date object.
 * Subtracts `daysAgo` days, adjusts it for the user's timezone and returns a string in 'yyyy-mm-dd' format.
 */
export default function getTimeZoneAdjustedStartDate(
  date: Date,
  daysAgo: number
) {
  let now = new Date();
  const timeZoneOffsetMinutes = now.getTimezoneOffset();
  const startDate = sub(new Date(now), {
    minutes: timeZoneOffsetMinutes,
    days: daysAgo
  });
  return format(startDate, "yyyy-MM-dd");
}
