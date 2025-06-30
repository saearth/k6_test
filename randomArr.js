/**
 * Selects a random item from a given array.
 *
 * @param {Array<any>} arr The array from which to select a random item.
 * @returns {any} A random item from the array.
 * @throws {Error} If the input is not an array or if the array is empty.
 */
export function getRandomItemFromArray(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Input must be an array.');
  }
  if (arr.length === 0) {
    throw new Error('Array cannot be empty.');
  }
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}