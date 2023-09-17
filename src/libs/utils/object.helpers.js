/**
 * @description
 * encodes values and keys internally
 */
export function objToQueryString(obj) {
  return Object.keys(obj)
    .map((key) => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
    })
    .join("&");
}
