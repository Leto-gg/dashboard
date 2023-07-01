/**
 * @param {string[]} cids
 * @param {RangeQuery} range
 */
export function getAnalytics(cids, range = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log({ cids, range });
      // fetch("https://api.leto.gg/v1/analytics", {
      //   headers: {
      //     // add auth header
      //   }
      // })
      // Return mock response temporarily
      resolve({
        success: true,
        data: {
          metadata: [
            {
              total: 2,
              page: 1,
            },
          ],
          data: [
            {
              cid: "bafkreiedazv25tc7idkywbco3jxrywdnb3g4ff3pqegrmshhtcpk5zgsyi",
              cidType: "ipfs",
              lastAccessed: "2023-04-10T22:16:42.813Z",
              numbersAccessed: 33,
            },
            {
              cid: "bafkreigt25bt7a6fdnx72jhtnnoezvoihcxxlvyc6kpxkfonayxrqnpiie",
              cidType: "ipfs",
              lastAccessed: "2023-04-07T09:42:14.531Z",
              numbersAccessed: 3,
            },
          ],
        },
      });
    }, 500);
  });
}

/**
 * @typedef RangeQuery
 * @property {Date} from
 * @property {Date} [to]
 */