/**
 * @param {string} src
 */
function useImageBaseURL(src) {
  return import.meta.env.BASE_URL + src;
}

export default useImageBaseURL;
