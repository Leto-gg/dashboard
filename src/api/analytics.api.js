import { httpClient } from "../libs/axios";
import { objToQueryString } from "../libs/utils/object.helpers";

const DEFAULT_RANGE = {
  from: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(),
  to: new Date().toISOString(),
};

/**
 * @param {RangeQuery} range
 */
export function getAnalytics(range = DEFAULT_RANGE) {
  let apiUrl = "/dashboard";
  if (Object.keys(range)) {
    apiUrl = `${apiUrl}?${objToQueryString(range)}`;
  }
  return httpClient.get(apiUrl);
}

/**
 * @typedef RangeQuery
 * @property {Date} from
 * @property {Date} [to]
 */
