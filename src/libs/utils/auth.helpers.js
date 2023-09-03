/**
 * @returns {string | null}
 */
export const getAuthToken = () => {
  return localStorage.getItem("token");
};

/**
 * @param {string} token
 */
export function setAuthToken(token) {
  localStorage.setItem("token", token);
}

export function clearAuthToken() {
  localStorage.removeItem("token");
}
