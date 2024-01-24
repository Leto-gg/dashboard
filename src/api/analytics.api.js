import { httpClient } from "../libs/axios";
import { objToQueryString } from "../libs/utils/object.helpers";

/**
 * @param {RangeQuery} range
 */
export function getAnalytics(params) {
  let apiUrl = "/dashboard";
  if (Object.keys(params)) {
    apiUrl = `${apiUrl}?${objToQueryString(params)}`;
  }
  return httpClient.get(apiUrl);
}

/**
 * @typedef RangeQuery
 * @property {Date} from
 * @property {Date} [to]
 */
