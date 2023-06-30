/**
 * @param {string[]} cids
 */
export function updateCIDs(cids) {
  // use axios instance with a set base url
  // return apiInstance.put("/cids", {
  //   cids,
  // });
  console.log("updating cids", cids);
  // return mock temporarily,
  return {
    data: {
      success: true,
      cids,
    },
  };
}
/**
 * @param {string} cid
 */
export function removeCID(cid) {
  // use axios instance with a set base url
  // return apiInstance.delete(`/cid/${cid}`, {
  //   cids,
  // });
  console.log("deleting cid", cid);
  // return mock temporarily,
  return {
    data: {
      success: true,
    },
  };
}
