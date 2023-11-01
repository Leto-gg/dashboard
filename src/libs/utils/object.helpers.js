/**
 * @description
 * encodes values and keys internally
 */
export function objToQueryString(obj) {
  return Object.keys(obj)
    .filter((key) => obj[key])
    .map((key) => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
    })
    .join("&");
}
