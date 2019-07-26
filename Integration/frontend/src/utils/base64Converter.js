/**
 * Converts Base64 data to UintArray
 *
 * @param data Base64 data
 * @returns {*} UintArray data
 */
export const b64ToUintArray = (data) => {
  const byteChars = atob(data)
  const byteNumbers = new Uint8Array(byteChars.length)
  for (let i = 0; i < byteNumbers.length; i++) {
    byteNumbers[i] = byteChars.charCodeAt(i)
  }
  return byteNumbers
}
