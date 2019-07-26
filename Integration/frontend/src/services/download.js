import html2canvas from 'html2canvas'
require('./html')

/**
 * Downloads contents of of a HTML node element as image
 *
 * @param wrapperElement node element to covert to and download as image
 * @param prefix name for file
 */
export const downloadElementAsImage = (wrapperElement, prefix) => {
  const svgs = Array.from(wrapperElement.getElementsByTagName('svg'))
  const imgReplacements = []

  // Temporarily replace all svgs with derived data images
  svgs.forEach((svg, i) => {
    imgReplacements[i] = svg.toImg().insertAfter(svg)
    svg.remove()
  })

  setTimeout(() => {
    html2canvas(wrapperElement).then((canvas) => {
      // Restore svgs and remove temp data images
      svgs.forEach((svg, i) => {
        svg.insertAfter(imgReplacements[i])
        imgReplacements[i].remove()
      })

      if (canvas.msToBlob) {
        startFileDownloadFromBlob(canvas.msToBlob(), '.png', prefix)
      } else {
        canvas.toBlob(blob => { startFileDownloadFromBlob(blob, '.png', prefix) })
      }
    })
  })
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
