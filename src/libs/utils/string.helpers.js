/**
 *
 * @param {string} string
 * @param {number} n
 */
export function middleTruncate(string, n) {
  const left = string.slice(0, n);
  const right = string.slice(string.length - n);

  return `${left}...${right}`;
}
