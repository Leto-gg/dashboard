import { httpClient } from "../libs/axios";
import { objToQueryString } from "../libs/utils/object.helpers";

/**
 * @param {string[]} cids
 */
export function createCID(cid) {
  return httpClient.post("/cids", {
    cid,
  });
}

/**
 * @param {number} page
 */
export function getCIDs(page) {
  const apiUrl = "/cids?" + objToQueryString({ page });
  return httpClient.get(apiUrl);
}

/**
 * @param {string} cid
 */
export function removeCID(cid) {
  console.log("deleting cid", cid);
  cid = encodeURIComponent(cid);
  return httpClient.delete(`/cids/${cid}`);
}
