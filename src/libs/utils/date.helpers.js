import { format } from "date-fns";

/**
 * @param {string} date
 */
export function getFormattedDate(date) {
  return format(new Date(date), "MM/dd/yyyy");
}
