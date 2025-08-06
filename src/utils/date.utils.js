import { DAY_IN_MILLISECONDS } from "../constants/date.constants";

export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
}

export function getDaysBetween(startDate, endDate) {
  return Math.floor((endDate - startDate) / DAY_IN_MILLISECONDS);
}
