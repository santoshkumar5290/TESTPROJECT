import { b64ToUintArray } from './base64Converter'

/**
 * Downloads data to the file
 *
 * @param data to download
 * @param extension for the file - .png, .cvs, etc.
 * @param type is a mimeType
 * @param prefix name for file
 */
export const startFileDownload = (data, extension, type, prefix) => {
  const blob = new Blob([data], {type})
  startFileDownloadFromBlob(blob, extension, prefix)
}

/**
 * Downloads data to the file
 *
 * @param src data to download - base64 encoded data
 * @param extension for the file - .png, .cvs, etc.
 * @param type is a mimeType
 * @param prefix name for file
 */
export const startFileDownloadFromImgSrc = (src, extension, type, prefix) => {
  const data = b64ToUintArray(src.replace('data:image/jpg;base64,', ''))
  startFileDownload(data, extension, type, prefix)
}

/**
 * Downloads data to the file
 *
 * @param blob data to download - expects correct Blob object
 * @param extension for the file - .png, .cvs, etc.
 * @param prefix name for file
 */
export const startFileDownloadFromBlob = (blob, extension, prefix) => {
  // create filename and replace non-valid symbols like '/' or ':'
  // then remove all hidden characters.
  const filename = (prefix + '-' + new Date().toLocaleString() + extension)
    .replace(/[/:]/g, '-')
    .replace(/[^a-zA-Z0-9 -.]/g, '')
  if (window.navigator.msSaveOrOpenBlob) { // IE 10 / Edge compatibility
    window.navigator.msSaveOrOpenBlob(blob, filename)
  } else {
    const a = document.createElement('a')
    const url = window.URL.createObjectURL(blob)
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.dispatchEvent(new MouseEvent('click'))
    // set timeout that revokeObjectURL can work correctly
    setTimeout(() => {
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    }, 0)
  }
}
