import * as isIPFS from "is-ipfs";

export const isValidCID = (cid) => isIPFS.cid(cid) || isIPFS.cidPath(cid);
